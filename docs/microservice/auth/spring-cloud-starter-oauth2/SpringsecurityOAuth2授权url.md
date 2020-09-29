# Spring security OAuth2  端点（endpoints）授权url

## 1. 获取token令牌

url： http://localhost:8101/oauth/token

请求参数：form-data

| key        | value                                 |
| ---------- | ------------------------------------- |
| username   | zsz                                   |
| password   | 1234qwer                              |
| grant_type | password                              |
| key        | 0E2249E188468991EBD195351579954841236 |
| code       | 9982                                  |

请求Headers：

| key           | value                  |
| ------------- | ---------------------- |
| Authorization | Basic ZmViczoxMjM0NTY= |

返回结果：

访问资源服务器受保护的资源，附上令牌在请求头

```json
{
    "access_token": "940ff657-9454-4a32-95b2-9820f5d6c3f9",
    "token_type": "bearer",
    "refresh_token": "2cbfa791-0b92-4b46-b45e-b5c264c5e1f1",
    "expires_in": 86399,
    "scope": "all"
}
```

