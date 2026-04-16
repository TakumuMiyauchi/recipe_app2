# API仕様書

## 認証について

`🔒` マークのついたエンドポイントはJWT認証が必要です。  
リクエストヘッダーに以下を付与してください。

```
Authorization: Bearer {token}
```

---

## 認証 `/auth`

### POST /auth/login
ログイン

- 認証：不要

**Request Body**
```json
{
  "email": "example@email.com",
  "password": "password123"
}
```

**Response** `200 OK`
```json
{
  "token": "eyJhbGci..."
}
```

---

### GET /auth/me 🔒
ログイン中のユーザー情報取得

**Response** `200 OK`
```json
{
  "userId": 1,
  "email": "example@email.com"
}
```

---

## ユーザー `/user`

### POST /user/register
新規ユーザー登録

- 認証：不要

**Request Body**
```json
{
  "userName": "山田太郎",
  "email": "example@email.com",
  "password": "password123"
}
```

**Response** `200 OK`
```
ユーザー登録完了
```

---

### POST /user/reset-password
パスワード変更

- 認証：不要

**Request Body**
```json
{
  "email": "example@email.com",
  "newPassword": "newpassword123"
}
```

**Response** `200 OK`
```
パスワードを変更しました
```

**Error** `404 Not Found` : 該当メールアドレスのユーザーが存在しない場合

---

## レシピ `/recipes`

### GET /recipes 🔒
レシピ一覧取得（ページング対応）

**Query Parameters**

| パラメータ | デフォルト | 説明 |
|-----------|-----------|------|
| page | 0 | ページ番号（0始まり） |
| size | 10 | 1ページあたりの件数 |
| sort | registeredAt | ソートキー |

**Response** `200 OK`
```json
{
  "content": [
    {
      "recipeId": 1,
      "recipeName": "カレーライス",
      "recipeUrl": "https://example.com/recipe/1",
      "imagePath": "uploads/images/xxx.jpg",
      "registeredAt": "2025-01-01T12:00:00",
      "recipeCount": 3,
      "userName": "山田太郎",
      "categories": [
        { "categoryId": 1, "categoryName": "和食", "thumbnailPath": "uploads/images/yyy.jpg" }
      ]
    }
  ],
  "totalElements": 50,
  "totalPages": 5,
  "number": 0
}
```

---

### GET /recipes/{recipeId} 🔒
レシピ詳細取得

**Response** `200 OK`
```json
{
  "recipeId": 1,
  "userId": 1,
  "recipeName": "カレーライス",
  "recipeUrl": "https://example.com/recipe/1",
  "imagePath": "uploads/images/xxx.jpg",
  "registeredAt": "2025-01-01T12:00:00",
  "recipeCount": 3,
  "note": "スパイスを多めに",
  "categories": [
    { "categoryId": 1, "categoryName": "和食", "thumbnailPath": "uploads/images/yyy.jpg" }
  ]
}
```

---

### POST /recipes 🔒
レシピ登録

**Request Body**
```json
{
  "recipeName": "カレーライス",
  "recipeUrl": "https://example.com/recipe/1",
  "imagePath": "uploads/images/xxx.jpg",
  "recipeCount": 1,
  "note": "スパイスを多めに",
  "categoryIds": [1, 2]
}
```

**Response** `200 OK`
```
レシピが登録されました。
```

---

### PUT /recipes/{recipeId} 🔒
レシピ編集

**Request Body**
```json
{
  "recipeName": "カレーライス（改）",
  "recipeUrl": "https://example.com/recipe/1",
  "imagePath": "uploads/images/xxx.jpg",
  "recipeCount": 2,
  "note": "玉ねぎを多めに炒める",
  "categoryIds": [1]
}
```

**Response** `200 OK`
```
レシピが編集されました
```

---

### DELETE /recipes/{recipeId} 🔒
レシピ削除

**Response** `200 OK`
```
レシピが削除されました。
```

---

## カテゴリー `/categories`

### GET /categories
カテゴリー一覧取得

- 認証：不要

**Response** `200 OK`
```json
[
  { "categoryId": 1, "categoryName": "和食", "thumbnailPath": "uploads/images/yyy.jpg" },
  { "categoryId": 2, "categoryName": "洋食", "thumbnailPath": "uploads/images/zzz.jpg" }
]
```

---

## ファイルアップロード `/upload`

### POST /upload 🔒
画像ファイルのアップロード

**Request** `multipart/form-data`

| フィールド | 型 | 説明 |
|-----------|-----|------|
| file | File | アップロードする画像ファイル（最大10MB） |

**Response** `200 OK`
```json
{
  "path": "uploads/images/xxx.jpg"
}
```
