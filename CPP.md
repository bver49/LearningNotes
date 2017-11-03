Install gcc by binary file

```sh
wget http://mirror/gcc-6.1.0.tar.gz   
tar xzf gcc-6.1.0.tar.gz
cd gcc-6.1.0
./contrib/download_prerequisites
cd ..
mkdir objdir
cd objdir
$PWD/../gcc-6.1.0/configure --prefix=$HOME/GCC-6.1.0 --enable-languages=c,c++,fortran,go
make
make install
```

```sh
export CC='/home3/sixeigst/GCC-6.1.0/bin/gcc'
export CXX='/home3/sixeigst/GCC-6.1.0/bin/g++'
export LD_LIBRARY_PATH='/home3/sixeigst/GCC-6.1.0/lib64/:$LD_LIBRARY_PATH'
```
