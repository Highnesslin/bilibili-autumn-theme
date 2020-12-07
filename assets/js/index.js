// 屏幕宽度
const width = document.body.clientWidth;
// 图片数组
const imgList = Array.from($('.wrapper .layer img'));
// 默认样式
const defaultStyles = [
  {
    translateX: 0,
    translateY: 0,
    blur: 4,
  },
  {
    translateX: 0,
    translateY: 0,
    blur: 0,
  },
  {
    translateX: -50,
    translateY: 0,
    blur: 1,
  },
  {
    translateX: 0,
    translateY: 4.2,
    blur: 4,
  },
  {
    translateX: 0,
    translateY: -1.8,
    blur: 5,
  },
  {
    translateX: 0,
    translateY: 0,
    blur: 6,
  },
];

// 鼠标左移后的最终样式
const leftStyles = [
  {
    translateX: 0,
    translateY: 0,
    blur: 0,
  },
  {
    translateX: -9,
    translateY: 0,
    blur: 10,
  },
  {
    translateX: -80,
    translateY: 0,
    blur: 5,
  },
  {
    translateX: -36,
    translateY: 4.2,
    blur: 13,
  },
  {
    translateX: -78,
    translateY: -1.8,
    blur: 14,
  },
  {
    translateX: -97,
    translateY: 0,
    blur: 12,
  },
];

// 鼠标右移后的最终样式
const rightStyles = [
  {
    translateX: 0,
    translateY: 0,
    blur: 8,
  },
  {
    translateX: 9,
    translateY: 0,
    blur: 8,
  },
  {
    translateX: 21,
    translateY: 0,
    blur: 4,
  },
  {
    translateX: 35,
    translateY: 4.2,
    blur: [0, 4],
  },
  {
    translateX: 77,
    translateY: -1.8,
    blur: [0, 4],
  },
  {
    translateX: 96,
    translateY: 0,
    blur: 0,
  },
];

// 图片默认样式
function setDefaultImgStyle() {
  for (let i = 0; i < imgList.length; i++) {
    const imgItem = imgList[i];
    const { translateX, translateY, blur } = defaultStyles[i];
    // 设置位置偏移以及高斯模糊
    $(imgItem).css({
      transform: `translate(${translateX}px, ${translateY}px)`,
      filter: `blur(${blur}px)`,
    });
  }
}
setDefaultImgStyle();

// 眨眼
function setShakeAnimation() {
  // 第二张小女孩图片
  const imgGirl = $('.wrapper .child img');

  // 每 3 秒眨一次眼睛
  setInterval(() => {
    // 半闭眼
    $(imgGirl).attr('src', './assets/images/2_2.png');

    // 完全闭上眼眼睛
    setTimeout(() => {
      $(imgGirl).attr('src', './assets/images/2_3.png');
    }, 100);

    // 半睁开眼睛
    setTimeout(() => {
      $(imgGirl).attr('src', './assets/images/2_2.png');
    }, 300);

    // 完全睁开眼睛
    setTimeout(() => {
      $(imgGirl).attr('src', './assets/images/2_1.png');
    }, 400);
  }, 3000);
}
setShakeAnimation();

// 图片移动时的样式
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
$(function () {
  // 鼠标进入时
  $('.wrapper').mouseenter(e => {
    // 鼠标离开时解除事件监听，并重置状态
    $('.wrapper').mouseleave(() => {
      for (let item of imgList) {
        $(item).css({
          transition: 'transform 0.2s, filter 0.2s',
        });
      }
      setDefaultImgStyle();
      $('.wrapper').off('mousemove');
      $('.wrapper').off('mouseleave');
    });

    // 鼠标进入时记录位置
    const originalX = e.pageX;
    $('.wrapper').mousemove(e => {
      // 鼠标移动时记录位置
      const currentX = e.pageX;
      // 根据屏幕宽度和移动距离，计算移动的比例
      const offsetRatio = (currentX - originalX) / width;
      // 鼠标左移
      if (offsetRatio < 0) {
        setImgStyle(Math.abs(offsetRatio), 'left');
        // 鼠标右移
      } else {
        setImgStyle(offsetRatio, 'right');
      }
    });
  });
});
