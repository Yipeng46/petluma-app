# PetLuma Physical Passport Specification v1.0

**Document Type:** Production Specification / 生产规格书  
**Product Name:** PetLuma Kingdom Companion Passport（宠物王国伴侣护照）  
**Version:** 1.0  
**Date:** 2026-06-01  
**Prepared for:** First physical prototype / 首版实体打样  
**Unit:** millimeters (mm), unless noted  

---

## 0. Document Purpose / 文件用途

本文件为 PetLuma 实体伴侣护照首版打样之完整生产规格。  
印刷厂收到本文件及配套印前文件后，应能独立完成：打样、工艺确认、档案盒配套、包装出货。

本文件不包含营销内容，仅含可执行之尺寸、材料、工艺与交付要求。

---

## 1. Finished Product Dimensions / 成品尺寸

### 1.1 Primary Parameter Table / 主参数表

| Item 项目 | Parameter 参数 | Tolerance 公差 | Notes 备注 |
|---|---|---|---|
| Closed width 闭合宽度 | **130 mm** | ±0.5 mm | 短边，Portrait 竖版 |
| Closed height 闭合高度 | **190 mm** | ±0.5 mm | 长边 |
| Closed spine thickness 书脊厚度 | **10–14 mm** | ±1.0 mm | 含灰板封面与内页书芯；首版打样目标 12 mm |
| Corner radius 外圆角 | **R4 mm** | ±0.5 mm | 封面四角统一圆角 |
| Orientation 方向 | Portrait 竖版 | — | 封面文字自上而下阅读 |
| Fold axis 折页轴 | Left spine 左侧书脊 | — | 右开式（封面从左向右打开） |

### 1.2 Open Flat Spread / 展开尺寸（内页跨页）

| Item 项目 | Parameter 参数 | Notes 备注 |
|---|---|---|
| Flat spread width 跨页总宽 | **248 mm** | 130 mm × 2 − 12 mm（书脊）≈ 248 mm 可视幅面 |
| Flat spread height 跨页高度 | **184 mm** | 成品高 190 mm − 上下各 3 mm 裁切净边参考 |
| Safe area inset 安全边 | **8 mm** | 距裁切线；文字与肖像不得进入出血区 |

### 1.3 Dimension Diagram / 尺寸图（闭合态）

```
                    130 mm
          ←─────────────────────→
          ┌─────────────────────┐
          │                     │  ╭─ R4
          │    FRONT COVER      │  │
          │    (Hardcover)      │  │ 190 mm
          │                     │  │
          │                     │  ╰─ R4
          └─────────────────────┘
                    │
                 SPINE
                 12 mm
                 (side view)
```

### 1.4 Spine & Thickness Diagram / 书脊侧视

```
        ┌──┐
        │  │ ← Front cover board 2.0 mm
        │▓▓│ ← Endpaper + text block
        │  │ ← Back cover board 2.0 mm
        └──┘
        10–14 mm total
```

---

## 2. Page Count / 页数

### 2.1 Page Structure Table / 结构页数表

| Sequence 序号 | Page 页面 | Content 内容 | Paper 纸张 | Print 印刷 |
|---|---|---|---|---|
| — | Front cover 封面 | PETLUMA 标识、烫金图案 | 灰板 + 裱糊面材 | 面材印刷 + 烫金 |
| — | Back cover 封底 | 注册信息、条码/QR 预留 | 同上 | 单色或空白 |
| 1 | Endpaper (front) 前扉页 | 纯色或轻微纹理 | 140 g/m² 米色书纸 | 1/0 或 0/0 |
| 2 | Identity spread L 身份页左 | Companion Portrait 肖像区 | 120 g/m² 象牙艺术纸 | 4/4 |
| 3 | Identity spread R 身份页右 | Name / Species / Breed / ID 字段 | 同上 | 4/4 |
| 4 | Registry record 注册记录页 | Kingdom Since / Guardian / Passport No. | 同上 | 4/4 |
| 5 | Archive statement 档案说明页 | 静态说明文字（无营销） | 同上 | 4/4 |
| 6 | Blank archive 空白档案页 | 供用户手写/收纳备注 | 同上 | 0/0 或 1/0 细线框 |
| 7–8 | Endpaper (back) 后扉页 | 纯色 | 140 g/m² 米色书纸 | 1/0 或 0/0 |

**首版打样合计：**  
- 封面封底：2 panels（不计入内页页码）  
- 内页：**8 pages（4 sheets, 4/4 CMYK）**  
- 含 2 张扉页  

**量产预留（v1.0 打样不强制）：** 可扩展至 16 内页，书脊厚度相应调整至 16–18 mm。

---

## 3. Bleed & Trim / 出血尺寸

### 3.1 Bleed Parameter Table / 出血参数表

| Item 项目 | Value 数值 | Notes 备注 |
|---|---|---|
| Bleed 出血 | **3 mm** | 四周各 3 mm，中国大陆常规标准 |
| Trim size 裁切尺寸 | 130 × 190 mm | 成品尺寸 |
| Live area 活区 | 114 × 174 mm | 距裁切线向内 8 mm |
| Spine gutter 书脊槽 | **6 mm** | 跨页中缝不放置文字/肖像 |
| Slug / registration 定位信息 | 裁切线外 5 mm | 包含色标、版号、日期 |

### 3.2 File Canvas / 印前画布尺寸

| File type 文件类型 | Canvas 画布尺寸 (W×H) | Bleed included 含出血 |
|---|---|---|
| Single page 单页 | 136 × 196 mm | Yes |
| Cover wrap 封面展开 | 按书脊厚度计算* | Yes |
| Flat spread 跨页 | 256 × 196 mm | Yes（含中缝） |

\* **Cover wrap formula 封面展开公式：**  
`Cover width = 130 + 12 (spine) + 130 + 6 (turn-in each side) = 284 mm`（首版参考，turn-in 各 3 mm 包边）  
`Cover height = 190 + 6 (turn-in top/bottom) = 196 mm`

---

## 4. Cover Material / 封面材质建议

### 4.1 Cover Material Table / 封面材料表

| Layer 层级 | Material 材料 | Spec 规格 | Color 颜色 | Notes 备注 |
|---|---|---|---|---|
| Board 灰板 | Grey board 双灰板 | **2.0 mm** | — | 硬度一致，无起层 |
| Wrap 裱糊面材 | PU leather texture 仿皮 PU | 0.8–1.0 mm | **Pantone 19-4015 TCX** 近似 **#0B1828** | 哑光，细颗粒皮纹 |
| Alternative 备选 | Cloth binding cloth 布面 | 125 g/m² 装帧布 | Navy 深藏青 | 需做耐磨测试 |
| Inner liner 内贴 | 120 g/m² 涂布纸或装帧纸 | — | **#071426** | 与封面色调一致 |

### 4.2 Surface Finish / 表面处理

| Process 工艺 | Scope 范围 | Requirement 要求 |
|---|---|---|
| Matte lamination 哑膜 | 全封面（烫金区域除外） | 不可影响烫金附着力；建议局部跳过烫金区 |
| Deboss 压凹 | Gate Emblem 外圈可选 | 深度 0.3–0.5 mm，与烫金套准 |
| Edge painting 书口染色 | 可选 | 首版打样：不做 |

**外观目标：** 档案馆精装书感，非亮面塑料感，非旅行证件亮膜。

---

## 5. Hot Foil Stamping / 烫金工艺建议

### 5.1 Foil Parameter Table / 烫金参数表

| Item 项目 | Specification 规格 |
|---|---|
| Foil type 烫金箔 | **Matte gold 哑光金**（非镜面亮金） |
| Color reference 色参考 | **Pantone 871 C** 或 **#C9A45C** |
| Foil area 烫金区域 | 见下表 |
| Registration 套准 | ±0.2 mm |
| Pressure 压力 | 中等，确保 PU 面附着，无压穿灰板 |
| Temperature 温度 | 按箔材供应商建议，打样前做 10×10 mm 测试块 |

### 5.2 Foil Elements / 烫金元素清单

| Element 元素 | Position 位置 | Size reference 尺寸参考 | Font 字体 |
|---|---|---|---|
| PETLUMA KINGDOM | 封面上部 | 距顶 18 mm，居中 | Inter SemiBold, 全大写, 字距 +350 |
| PETLUMA | 封面中部偏上 | 居中 | Cormorant Garamond Medium, 全大写 |
| PASSPORT | PETLUMA 下方 | 居中 | Cormorant Garamond Medium, 字距 +400 |
| Gate Emblem 王国门徽 | 封面中央 | 宽 **72 mm** | 矢量线稿，见印前文件 |
| ARCHIVE DOCUMENT 行 | 封底或封面下部 | 距底 22 mm | Inter SemiBold, 6 pt 等效 |
| Passport No. 护照号 | 封底下部 | 距底 14 mm | Monospace, 8 pt 等效 |

**工艺说明：**  
- 烫金文件须独立分层：`FOIL_GOLD` Spot Color，100% M  
- 门徽建议：**烫金 + 轻微压凹** 组合（先凹后烫或套准一次完成，由厂方评估）  
- 首版打样：**至少提供 1 本纯烫金测试封面 + 1 本完整成品**

---

## 6. Inner Paper / 内页纸张建议

### 6.1 Inner Paper Table / 内页纸张表

| Item 项目 | Specification 规格 |
|---|---|
| Paper type 纸型 | **Uncoated ivory art paper 未涂布象牙艺术纸** |
| Weight 克重 | **120 g/m²** |
| Color 颜色 | **#F2EADC – #ECE3D2**（自然象牙白，非漂白高白） |
| Opacity 不透明度 | ≥ 92% |
| Grain 纸纹 | Long grain 长纹，书脊方向一致 |
| Endpaper 扉页 | **140 g/m²**，同色系列，可略深 5% |

### 6.2 Printing on Inner Pages / 内页印刷要求

| Item 项目 | Specification 规格 |
|---|---|
| Color 色彩 | **4/4 CMYK**，ICC: **ISO Coated v2 (FOGRA39)** 或厂方推荐 coated profile |
| Black text 黑色文字 | **Rich Black 禁用**；正文黑使用 **C0 M0 Y0 K100** 或 **K90** |
| Photo area 肖像区 | 预留 **35 × 45 mm** 标准裁切框；打样可用 CMYK 样图 |
| Screen ruling 网线 | 175–200 lpi |
| Total ink coverage 总墨量 | ≤ 280% |

**内页视觉参考：** 档案纸、博物馆说明卡，非铜版高光。

---

## 7. Binding Method / 装订方式建议

### 7.1 Binding Parameter Table / 装订参数表

| Stage 阶段 | Method 方式 | Notes 备注 |
|---|---|---|
| Prototype 首版打样 | **Section sewn + hardcover case 锁线精装** | 推荐，耐久，符合档案感 |
| Alternative 备选打样 | **Perfect bind 无线胶装** + 软封面 | 仅用于低成本结构验证，非量产方向 |
| Text block 书芯 | 4 sheets folded = 8 pages | 对折后锁线，书脊贴布 |
| Case making 做壳 | 灰板裱糊 → 贴面 → 套壳 | 书芯与壳体分离制作后套合 |
| Head/tail bands 堵头布 | 可选 | 首版：建议使用，宽 12 mm，色 #8A7349 |

### 7.2 Binding Diagram / 装订结构示意

```
[Back Cover Board] ─┐
                    ├── Case Wrap (PU)
[Front Cover Board]─┘
         │
    [Endpaper]
         │
    [Sewn Signatures] × 1–2
         │
    [Endpaper]
```

**生产说明：**  
- 书芯锁线后需 **三面裁切**，裁切精度 ±0.3 mm  
- 套壳后封面与书芯居中，偏位 ≤ 1.0 mm  
- 开合测试：180° 平摊，书脊无 cracking（PU 面材与灰板选配合格者）

---

## 8. Archive Box Dimensions / 档案盒尺寸建议

### 8.1 Box Parameter Table / 档案盒参数表

| Item 项目 | Parameter 参数 | Tolerance 公差 |
|---|---|---|
| Exterior width 外宽 | **150 mm** | ±1.0 mm |
| Exterior depth 外深 | **210 mm** | ±1.0 mm |
| Exterior height 外高 | **38 mm** | ±1.0 mm |
| Interior fit 内腔 | 容纳 1 本护照 + 1 张说明卡 | 松紧适中，无压痕 |
| Lid overlap 盒盖包边 | 15 mm | — |
| Spine label area 书脊标签区 | 20 × 60 mm | 可贴 Companion ID 预留 |

### 8.2 Box Diagram / 档案盒尺寸图

```
          150 mm
    ←────────────────→
    ┌────────────────┐  ╭─ lid
    │                │  │
    │   PASSPORT     │  │ 38 mm
    │   recess       │  │
    └────────────────┘  ╯
          210 mm (depth front to back)
```

---

## 9. Archive Box Material / 档案盒材质建议

| Component 部件 | Material 材料 | Spec 规格 |
|---|---|---|
| Board 主体 | **1.5 mm 单灰板 + 120 g/m² 裱糊艺术纸** | 直角或 R2 圆角 |
| Exterior wrap 外裱 | 与护照封面同系列 PU 或布面 | 颜色 **#0B1828** 或 **#F3F0EA** 米白备选 |
| Interior 内衬 | **400 g/m² 象牙卡纸** | 无印刷或 1/0 细线框 |
| Closure 闭合 | **磁吸 flap 磁吸翻盖** 或 **棉质ribbon 棉带** | 首版打样二选一，厂方推荐 |
| Foil on box 盒面烫金 | PETLUMA 字样，宽 40 mm | 同护照烫金箔 |

**工艺说明：** 盒体无高光塑料感；楞性充足，抗压 ≥ 5 kg 堆码不变形。

---

## 10. Shipping Packaging / 快递包装建议

### 10.1 Packaging Table / 包装参数表

| Layer 层级 | Material 材料 | Spec 规格 |
|---|---|---|
| Primary 内包装 | **棉纸 tissue + 牛油纸 sleeve** | 包裹护照+盒，防刮 |
| Secondary 固定 | **模切卡纸内托** | 护照盒居中，无晃动 |
| Shipper 外箱 | **E 楞瓦楞纸箱** | **180 × 240 × 55 mm**（单本） |
| Cushion 缓冲 | 再生纸浆缓冲或折纸卡 | 四角填充 |
| Seal 封箱 | 牛皮纸胶带 | 无品牌大色块 |

### 10.2 Packing Diagram / 包装结构

```
┌─────────────────────────┐  ← Shipper 180×240×55
│  [corner buffer]        │
│    ┌───────────────┐      │
│    │ Archive Box   │      │
│    │  + Passport   │      │
│    └───────────────┘      │
│  [corner buffer]        │
└─────────────────────────┘
```

**生产说明：** 单本包装重量目标 ≤ 350 g；防泼溅，不防水浸。

---

## 11. Print File Requirements / 印刷文件要求

### 11.1 Master File Table / 印前主文件表

| File 文件 | Format 格式 | Color 色彩 | Layers 图层 |
|---|---|---|---|
| Cover wrap 封面展开 | **PDF/X-4** 或 **AI CC** | CMYK + **Spot: FOIL_GOLD** | 分图层交付 |
| Inner pages 内页 | **PDF/X-4** | CMYK | 每页单独 PDF 或 1 个多页 PDF |
| Endpapers 扉页 | PDF/X-4 | CMYK 或 0/0 | — |
| Box dieline 盒型刀模 | AI / PDF | 1/0 刀模线 | 独立文件 |
| Emblem 门徽 | **AI 矢量** + **PDF 矢量** | 烫金专色层 | 线宽 ≥ 0.25 mm |

### 11.2 Technical Requirements / 技术要求

| Item 项目 | Requirement 要求 |
|---|---|
| Resolution 图像分辨率 | **300 dpi**（肖像区）；矢量元素不限 |
| Bleed 出血 | 3 mm，已包含在画布内 |
| Crop marks 裁切线 | 必须 |
| Color bars 色条 | 必须，含 CMYK + 烫金 spot |
| Font 字体 | 全部 **转曲 Outlines** 或嵌入子集 |
| Overprint 叠印 | 烫金层：**Overprint OFF**；黑字叠印按厂方设定 |
| PDF version | PDF/X-4:2010 或更高 |
| Naming 命名 | `PL-PPT_v1.0_[Component]_[Page]_CMYK.pdf` |

### 11.3 Color Reference Table / 颜色参考表

| Name 名称 | CMYK 参考 | HEX 参考 | Usage 用途 |
|---|---|---|---|
| Kingdom Navy 王国藏青 | C100 M85 Y45 K60 | #071426 | 封面背景 |
| Archive Ivory 档案象牙 | C3 M4 Y8 K0 | #F2EADC | 内页纸色 |
| Registry Ink 注册墨 | C0 M0 Y0 K85 | #2E2820 | 内页正文 |
| Muted Label 标签灰 | C0 M0 Y0 K55 | #6B6358 | 字段标签 |
| Gold Foil 烫金 | Spot FOIL_GOLD | #C9A45C | 烫金专色层 |

---

## 12. Prototype (Sampling) Requirements / 打样文件与打样要求

### 12.1 Sample Deliverables / 打样交付物

| Item 项目 | Quantity 数量 | Notes 备注 |
|---|---|---|
| Complete prototype 完整样 | **3 本** | 不同 Companion 数据填充 |
| Cover-only test 封面测试 | **2 片** | 烫金 + 压凹测试 |
| Paper swatch 纸样 | **1 套** | 120 g / 140 g 各 1 张 |
| Foil swatch 烫金样 | **1 张** | 至少 3 种 matte gold 供确认 |
| Archive box 档案盒 | **3 盒** | 与护照配套 |
| Packing mockup 包装样 | **1 套** | 含内托与外箱 |

### 12.2 Prototype File Package / 打样印前文件包

打样前须收到以下 **ZIP 打包交付**：

```
PL-PPT_v1.0_PrintPackage/
├── 01_Cover/
│   ├── PL-PPT_v1.0_CoverWrap_CMYK_FOIL.pdf
│   └── PL-PPT_v1.0_Emblem_FOIL.ai
├── 02_InnerPages/
│   ├── PL-PPT_v1.0_P02-03_IdentitySpread.pdf
│   ├── PL-PPT_v1.0_P04_RegistryRecord.pdf
│   ├── PL-PPT_v1.0_P05_ArchiveStatement.pdf
│   └── PL-PPT_v1.0_P06_BlankArchive.pdf
├── 03_Endpapers/
│   └── PL-PPT_v1.0_Endpaper.pdf
├── 04_Box/
│   ├── PL-PPT_v1.0_Box_Dieline.pdf
│   └── PL-PPT_v1.0_Box_Wrap_CMYK_FOIL.pdf
├── 05_Ref/
│   ├── ColorSpec_v1.0.pdf
│   └── MaterialPhoto_Ref/（可选参考图）
└── README_PrintInstructions_v1.0.txt
```

### 12.3 Prototype Approval Checklist / 打样确认清单

厂方打样完成后，需提交以下确认项：

- [ ] 成品尺寸 130 × 190 mm 实测图  
- [ ] 书脊厚度实测值  
- [ ] 烫金附着力测试（3M 胶带测试照片）  
- [ ] 封面 PU 耐磨测试（200 次往复）  
- [ ] 内页 180° 平摊照片  
- [ ] 档案盒配合度（无过紧/过松）  
- [ ] 包装跌落测试（60 cm，一角着地，1 次）照片  
- [ ] CMYK 色差 ΔE 报告（与打样签样对比）  

---

## Appendix A: Production Notes / 生产说明汇总

1. **产品定位：** 档案馆精装纪念护照，非政府旅行证件，无 RFID 芯片要求（v1.0 不含芯片）。  
2. **语言：** 内页英文为主；字段标签使用 Inter；姓名字段使用 Cormorant Garamond。  
3. **可变数据：** Passport No. / Companion ID 为可变序列号，首版打样可用固定 3 组数据；量产时由 CSV 数据驱动（另行提供）。  
4. **质检标准：** 首版按 AQL 2.5 抽检；外观烫金不完整、套准偏位 > 0.3 mm、封面气泡、内页缺页为零缺陷项。  
5. **交付周期参考：** 印前确认 3 工作日 → 打样 7–10 工作日 → 签样修改 1 轮。  

---

## Appendix B: Factory Quote Request Fields / 询价字段（供厂方填写）

| Field 字段 | Factory input 厂方填写 |
|---|---|
| MOQ 最小起订量 | |
| Prototype cost 打样费 | |
| Unit price @500 五百本单价 | |
| Lead time 大货周期 | |
| Binding method confirmed 确认装订方式 | |
| Foil supplier 烫金箔供应商 | |
| Paper brand 纸张品牌型号 | |

---

**End of Specification v1.0**

*PetLuma Kingdom Registry — Physical Production Document Only*
