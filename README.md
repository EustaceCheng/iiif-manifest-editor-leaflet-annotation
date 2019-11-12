# iiif-manifest-editor-leaflet-annotation #

根據 [iiif-manifest-editor](https://github.com/bodleian/iiif-manifest-editor) 延伸的作品


將其中顯示圖片的部分由[leaflet](https://leafletjs.com/)取代


並將[web annotaion data model](https://www.w3.org/TR/annotation-model/)的觀念加入

## 由來
網頁註記     
1.網頁註記的由來(將圖片放在網頁上) 研究員在看網頁上的圖片時，他們可以在圖片上紀錄重點與想法，以提升研究品質。   
2.將圖片透過顯示器放在網頁上(viewer) 瀏覽器讀取容量大圖片很耗時，有了圖片顯示器，可以縮短讀取時間。   
3.International Image Interoperability Framework (IIIF) (triple-I F) (國際圖片互通性框架) 圖片顯示器有很多，但圖片儲存格式不同，在互通傳遞時會需要調整。IIIF是一個國際圖片互通的框架，將圖片與圖片相關資料整合成一組link-data，不同顯示器只要依照IIIF定的規範去解讀link-data，就可以得到一樣的圖片與圖片相關資料。   
4.貢獻 A研究員對圖片做了註記，將這些資料存成IIIF格式，傳給B研究員，再透過IIIF的viewer顯示，讓研究成果能更快速的交流。    


## 使用方法

### 全域安裝

* npm 5.0.3

* nvm 0.35.0


### 進入iiif-manifest-editor資料夾
* nvm install v8.1.4
* npm install
* node-sass 4.12.0 [JavaScript]







**來自中央研究院-歷史語言研究所-數位文化中心之實習成果(2017.02-2018.03)**
