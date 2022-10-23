Crie imagens do Docker de vários arcos no Ubuntu Linux

Isso pode ser testado com o comando padrão docker buildapenas para corrigir qualquer erro antes de entrar em multi-arch. O buildxcomando será como

1
docker buildx build --push  --platform linux/arm/v7,linux/arm64/v8,linux/amd64 -t <docker user>/<repo>:<tag> .
Pode demorar um pouco para construir todas as 3 imagens. Depois disso, a mesma imagem deve poder ser executada em plataformas AMD64 ou ARM.

1
# em ambiente AMD64 ou ARM
2
docker run --rm <docker user>/<repo>:<tag>
EDIT: Quando há alguns erros estranhos com buildx, como

1
#8 23.71 Erro ao carregar /usr/sbin/dpkg-split: Nenhum arquivo ou diretório       
2
# ou
3
#13 0.187 Não é possível abrir o script perl "adduser": Arquivo ou diretório inexistente             
Uma possível correção é um conjunto de comandos

docker buildx inspect --bootstrap
1
docker run --rm  --privileged multiarch /qemu-user-static --reset  -p  sim
2
docker buildx create --name multiarch --driver docker -container --use
3
docker buildx inspecionar --bootstrap