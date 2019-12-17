# han-uni-axios



## 简介

简易版的axios，可以让你在uniapp中无缝切换成axios。支持axios的功能如下：

#### 1. 五种调用方式

#### 2. axios的几乎所有api（create，all.....)

#### 3. 可配置的defaults（包括请求响应数据转换，baseURL，验证器.....）

#### 4. 请求拦截和响应拦截

#### 5. 配置错误信息提示，包括状态码错误和超时等错误

#### 6. 取消请求

#### 7. 更多



## 安装

Using npm：

```
$ npm/cnpm install han-uni-axios -S
```



## 使用

### 1. 直接使用实例调用

#### Example1:

```js
import uniAxios from 'han-uni-axios'
uniAxios.request({
	url:'',
	method:'',//不传默认是get
	data:{}
})
```

#### Example2

```js
import uniAxios from 'han-uni-axios'
uniAxios.get({
	url:'',
	data:{}
})
```


### 2. 利用实例中的create创建的方法调用

#### Example1

```js
import uniAxios from 'han-uni-axios'
let http=uniAxios.create({
	baseURL
})
http({
	url:'',
        method:'',
	data:{}
})
```


### 3. 请求拦截和响应拦截

```js
import uniAxios from 'han-uni-axios'
let http=uniAxios.create({
  baseURL
})

//请求拦截
http.interceptors.request.use(config => {
  return config
}, error => {
  return error
})

// 响应拦截
http.interceptors.response.use(res => {
  return res
}, error => {
  return error
})
```

### 4. defaults配置

* transformRequestData 

> 转换请求的数据

* transformResponseData

> 转换请求的数据

* header

> 修改请求头

* catchErr

> 返回数据的状态码验证器

以上是自带的四个默认配置项

#### 4.1 使用实例调用

```js
import uniAxios from 'han-uni-axios'
uniAxios.defaults.header=xx //修改默认配置
uniAxios.defaults.baseURL='' //新值默认配置
```

#### 4.2 使用实例中的create创建的方法调用

```js
import uniAxios from 'han-uni-axios'
let http=uniAxios.create({
  header=xx, //修改默认配置
	baseURL:'xx'//新值默认配置
})
```

