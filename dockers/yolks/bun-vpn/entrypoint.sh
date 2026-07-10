#!/bin/bash
# bun-vpn entrypoint. Same STARTUP-variable contract as the other yolks, plus a short VPN preflight so
# the operator sees WHY tunnels fail (missing kernel device / capability) instead of a cryptic vopono
# error 30 lines into the log. Preflight is best-effort and never aborts the boot.
cd /home/container || exit 1

vpn_preflight() {
  # /dev/net/tun is required by OpenVPN and vopono. If the node didn't pass the device through, try to
  # create it — this succeeds only when the entrypoint has root/CAP_MKNOD; warn if we can't.
  if [ ! -c /dev/net/tun ]; then
    mkdir -p /dev/net 2>/dev/null
    if mknod /dev/net/tun c 10 200 2>/dev/null; then
      chmod 600 /dev/net/tun 2>/dev/null
    else
      echo "[bun-vpn] WARNING: /dev/net/tun is missing and could not be created."
      echo "[bun-vpn]          Add it to the container (wings: '--device /dev/net/tun') or VPN tunnels will fail."
    fi
  fi

  # Network-namespace + tunnel setup needs CAP_NET_ADMIN. Pterodactyl does NOT grant it by default.
  if command -v capsh >/dev/null 2>&1; then
    if ! capsh --print 2>/dev/null | grep -qi 'net_admin'; then
      echo "[bun-vpn] WARNING: NET_ADMIN capability not present — vopono cannot create VPN namespaces."
      echo "[bun-vpn]          Grant it on the node (wings: cap_add NET_ADMIN) for the VPN cluster to work."
    fi
  fi

  # DNS readability: some hosts' Docker generates /etc/resolv.conf and /etc/hosts as 0640 root:root, so
  # a non-root process can't read them and EVERY lookup fails with "Could not resolve host" (raw TCP
  # egress is unaffected). When we're root, relax them to world-readable — they hold only nameservers/
  # hostnames, no secrets. This only takes effect on a root run; standard Docker already makes them 0644,
  # so a non-root run typically resolves fine anyway.
  for f in /etc/resolv.conf /etc/hosts; do
    if [ -e "$f" ] && [ ! -r "$f" ]; then chmod o+r "$f" 2>/dev/null || true; fi
  done

  # Surface the toolchain versions once so the console header is self-documenting.
  echo "[bun-vpn] bun $(bun --version 2>/dev/null) | vopono $(${VOPONO_BIN:-vopono} --version 2>/dev/null | awk '{print $2}') | $(openvpn --version 2>/dev/null | head -1 | awk '{print $1, $2}') | wireguard-tools $(wg --version 2>/dev/null | awk 'NR==1{print $2}')"
}

vpn_preflight

# Replace Startup Variables ({{VAR}} -> ${VAR}) then run the server command.
MODIFIED_STARTUP=$(echo -e "${STARTUP}" | sed -e 's/{{/${/g' -e 's/}}/}/g')
echo -e ":/home/container$ ${MODIFIED_STARTUP}"

# Run the Server
eval "${MODIFIED_STARTUP}"
