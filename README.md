# han-uni-axios

![https://img.shields.io/badge/npm-%E7%89%88%E6%9C%ACv0.2.1-brightgreen](https://img.shields.io/badge/npm-版本v0.2.1-brightgreen)![https://img.shields.io/badge/install%20size-20KB-yellowgreen](https://img.shields.io/badge/install size-20KB-yellowgreen)



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

### 1. 调用方式

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

#### Example3

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



### 2. 请求拦截和响应拦截

```js
import uniAxios from 'han-uni-axios'
let http=uniAxios.create({
  baseURL
})

//请求拦截
http.interceptors.request.use(config => {
  return Promise.resolve(config)
}, error => {
  return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(res => {
  return Promise.resolve(res.data)
}, error => {
  return Promise.reject(error)
})
```



