# MERN-Photography-Portfolio-攝影作品集網站

[網站範例連結](https://mern-photography-portfolio.vercel.app/ "link")


<p align="left">
</p>

<h3 align="left">使用技術:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>


#
資料架構說明
#



```
backend/   後端
├── models  //資料庫
    ├── Space-model.js             //空間攝影
    └── Commercial.js              //商業攝影
    └── GraphicDesign-model.js     //平面設計
    └── HomePhoto.js               //首頁-單圖
    └── Portfolio.js               //個人簡介        
    └── fashion-model.js           //時尚攝影
    └── profile-model.js           //首頁-主視覺(圖)
    └── slideshow-model.js         //主頁-輪播圖
    └── user-model.js              //商品資料
└── controllers //控制與傳輸
    ├── GraphicDesign.js           //平面設計-API-資料庫處理
    └── Space.js                   //空間攝影-API-資料庫處理
    └── commercial.js              //商業攝影-API-資料庫處理
    └── createProfile.js           //首頁-主視覺-API-資料庫處理
    └── fashion.js                 //時尚攝影-API-資料庫處理
    └── portfolio.js               //個人簡介-API-資料庫處理
    └── sendMail.js                //Google第三方API-註冊會員與忘記密碼信箱驗證
    └── uploadHomePhoto.js         //上傳輪播圖
    └── uploadImgs.js              //上傳多張、單張圖片
└── middleware //中間件
    └── auth.js                    //JWT 身分驗證
    └── authAdmin.js               //Admin 身分驗證-這裡預設Admin=1，就是管理員
    
└── routes
    ├── Activity-route.js          //活動攝影-路由控制
    └── Commercial-route.js        //商業攝影-路由控制
    ├── GraphicDesign-route.js     //平面設計-路由控制   
    ├── HomePhoto-route.js         //首頁-單圖-路由控制
    └── Product.js                 //商品攝影-路由控制
    ├── Profile-route.js           //個人簡介-路由控制
    └── Space-route.js             //空間攝影-路由控制    
    └── slideshow-route.js         //輪播圖-路由控制 
    └── user-route.js              //身分驗證處理-路由控制
└── utils    
    └── cloudinary.js              //第三方圖片存放平台API設定
    └── multer.js                  //node.js 的中間件-處理multipart/form-data類型的表格數據，主要用於上傳文件、圖片，這裡透過Multer進行處理後，再上傳到cloudinary
├── index.js                       //主目錄、路由中間件管理、跨域設定、連結MongoDB資料庫設定    
├── .env               //環境變數-隱藏相關私密資訊
├── .gitignore         //設定不上傳之檔案
├── .package-lock.json //鎖定版本
├── .package.json      //紀錄專案中所使用的所有套件與版本
├── .validation.js     //表單驗證-可由前端做或後端，這裡採用後端製作，透過Joi套件生成客製化驗證資訊，再引入路由控制設定


client/   前端
├── public  
    ├── index.js       //渲染後要覆蓋的根目錄
└── src
    ├── components     //組件管理
    └── api            //管理Fetch API 
    └── public/img     //管理靜態圖片 
    └── utils          //中間件驗證處理、404頁面製作
    └── pages          //頁面
    └── Redux          //狀態管理
└── App.js             //路由管理
└── index.js           //渲染主入口
└── data.js            //輪播圖資料存放位置


```
