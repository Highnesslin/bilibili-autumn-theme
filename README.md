# 模仿 bilibili 秋季主题动画

## 图层叠加排版

```html
<section class="wrapper">
  <div class="layer">
    <img width="3000" height="250" src="./assets/images/1.png" alt="" />
  </div>
  <div class="layer child">
    <img width="1800" height="165" src="./assets/images/2_1.png" alt="" />
  </div>
  <div class="layer">
    <img width="3000" height="250" src="./assets/images/3.png" alt="" />
  </div>
  <div class="layer">
    <img width="1800" height="150" src="./assets/images/4.png" alt="" />
  </div>
  <div class="layer">
    <img width="1800" height="165" src="./assets/images/5.png" alt="" />
  </div>
  <div class="layer">
    <img width="1950" height="178" src="./assets/images/6.png" alt="" />
  </div>
</section>
```

## 高斯模糊+位移

```javascript
function setImgStyle(offsetRatio, direction = 'left') {
  const styles = direction === 'left' ? leftStyles : rightStyles;
  for (let i = 0; i < imgList.length; i++) {
    const imgItem = imgList[i];
    const {
      translateX: defaultTranslateX,
      translateY: defaultTranslateY,
      blur: defaultBlur,
    } = defaultStyles[i];
    const nowStyle = styles[i];

    // 根据移动比例计算最终坐标和高斯模糊值
    const translateX = (nowStyle.translateX - defaultTranslateX) * offsetRatio + defaultTranslateX;
    const blur = (nowStyle.blur - defaultBlur) * offsetRatio + defaultBlur;

    // 设置位置偏移以及高斯模糊
    $(imgItem).css({
      // 位置偏移
      transform: `translate(${translateX}px, ${defaultTranslateY}px)`,
      // 高斯模糊
      filter: `blur(${blur}px)`,
    });
  }
}
```

## 最终效果

![](./preview/bilibili.gif)
