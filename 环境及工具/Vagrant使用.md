#Vagrant安装
##1.安装 VirtualBox
免费的虚拟机，也可自行选用其他，但要使用相应的镜像  
下载地址：[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)  

##2.安装 Vagrant
下载地址： [http://downloads.vagrantup.com/](http://downloads.vagrantup.com/)  

##3.下载系统镜像box文件
自行下载自己所需的box文件，以下为别人搭建好的box文件，**linux默认密码为vagrant**：  
[http://www.vagrantbox.es/](http://www.vagrantbox.es/)  
##4.在Vagrant下挂在Box文件
以下代码都以centeos7.box为例  

    $ vagrant box add centos7 ./centos7_64.box  

##5.初始化环境
在项目代码根目录下初始化vagrant：  
    
    $ vagrant init centos7  

安装完成后当前目录会生成一个`Vagrantfie`，此为vagrant的配置文件

##6.启动vagrant及SSH连接
####开关机命令  
    $ vagrant up  //开机
    $ vagrant halt  //关机  

####Mac下SSH连接  
    $ vagrant ssh  //之后可用命令行操作虚拟机安装LAMP环境等

####Win下putty连接  
自行下载putty，采用ssh连接(需输入虚拟机ip，默认是22端口)  

##7.打包环境
打包后会生成一个.box文件，于是再从第4步开始就可使用一个别人搭好的环境  

    $ vagrant package --output NAME --vagrantfile FILE  

可选参数：  
`--output NAME`：(可选)设置包名为`NAME`  
`--vagrantfile FILE`：(可选)将路径为`FILE`的配置文件vagrantfile封装到box  

##8.额外
####网络配置
>vagrantfile(如果以下写法会报错，请参考原vagrantfile的语法写法)
>必须选择打开下面其一才能正常访问虚拟机, 默认会开启127.0.0.1:2222映射到虚拟机的22端口

+   较为常用是端口映射，就是将虚拟机中的端口映射到宿主机对应的端口直接使用，在Vagrantfile中配置：config.vm.network :forwarded_port, guest: 80, host: 8080,guest: 80 表示虚拟机中的80端口， host: 8080 表示映射到宿主机的8080端口  

+   如果需要自己自由的访问虚拟机，但是别人不需要访问虚拟机， ，在Vagrantfile中配置：config.vm.network :private_network, ip: "192.168.1.104",192.168.1.104表示虚拟机的IP，多台虚拟机的话需要互相访问的话，设置在相同网段即可  

+   如果需要将虚拟机作为当前局域网中的一台计算机，由局域网进行DHCP，那么在Vagrantfile中配置：config.vm.network :public_network

####开机启动
>vagrantfile中添加

    config.vm.provision "shell", run: "always", privileged: false, inline: <<-SHELL
        /etc/init.d/httpd start
    SHELL

可以在开机后执行shell脚本，/etc/init.d/httpd start为启动httpd即Apache服务

>参考连接
>[在Mac OS X上安装Virtual Box 和 Vagrant](http://liuzhichao.com/p/1940.html)  









