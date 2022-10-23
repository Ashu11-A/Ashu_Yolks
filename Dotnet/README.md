Crie imagens do Docker de vários arcos no Ubuntu Linux


This can be tested with the default docker build command just to iron out any error before going into multi-arch. The buildx command will be like

1 docker buildx build --push --platform linux/arm/v7,linux/arm64/v8,linux/amd64 -t <docker user>/<repo>:<tag> .
It might take a while to build all 3 images. After that the same image should be able to run on AMD64 or ARM platforms.

1 # in AMD64 or ARM environment

2 docker run --rm <docker user>/<repo>:<tag>
  
  
EDIT: When there’s some strange errors with buildx such as

1 #8 23.71 Error while loading /usr/sbin/dpkg-split: No such file or directory       
  
2 # or

3 #13 0.187 Can't open perl script "adduser": No such file or directory             

  
  
A potential fix is a set of commands

1 docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
  
2 docker buildx create --name multiarch --driver docker-container --use

3 docker buildx inspect --bootstrap
