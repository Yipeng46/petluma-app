# Supabase 环境变量（项目 ayvxvmdyabxfsfrhjxya）

复制 `env.local.example` 为 `.env.local`，再填入下面四个值。

## 在 Supabase Dashboard 哪里复制

打开：<https://supabase.com/dashboard/project/ayvxvmdyabxfsfrhjxya>

左侧 **Project Settings**（齿轮）→ **API**

| 变量 | Dashboard 位置 |
|------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | **Project URL**（例如 `https://ayvxvmdyabxfsfrhjxya.supabase.co`，不要带 `/rest/v1/`） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Project API keys** → **anon** → **public** |
| `SUPABASE_URL` | 与 `NEXT_PUBLIC_SUPABASE_URL` 相同 |
| `SUPABASE_SERVICE_ROLE_KEY` | **Project API keys** → **service_role** → **secret**（仅服务端，勿提交 Git、勿暴露到浏览器） |

## 填写示例

```env
NEXT_PUBLIC_SUPABASE_URL=https://ayvxvmdyabxfsfrhjxya.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

SUPABASE_URL=https://ayvxvmdyabxfsfrhjxya.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

保存后重启 `npm run dev`。在 Vercel 的 **Settings → Environment Variables** 中配置同名变量并重新部署。
