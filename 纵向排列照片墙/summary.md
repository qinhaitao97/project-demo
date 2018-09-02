# 总结

[TOC]

## 功能

![](http://ww1.sinaimg.cn/large/006eYMu7ly1ft9r3xuk9wg30tf0cpqv5.gif)

1. 加载页面，照片列表依次由下方滑入页面中央位置
2. 鼠标选题在某一个图片上，图片的亮度逐渐提高，同时文字逐渐变大
3. 鼠标点击某一张图片，第一步图片中央的文字逐渐小消失，同时未被点击的图片高度逐渐减小，宽度减小为0；第二步被点击的图片宽度逐渐增大占满整个容器，同时图片上方的文字逐渐显示出来，且关闭按钮（右上角）有旋转效果
4. 点击关闭按钮时，第一步图片上方文字逐渐消失，同时图片的宽度逐渐减小至初始状态；第二步，其他图片宽度恢复初始状态，宽度逐渐增高值初始状态，同时，图片中间文字逐渐展示出来

## html结构

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    
    <div class="wrapper">
        <ul class="wall">
            <li class="grid">
                <div class="item">
                    <div class="bg"></div>
                    <div class="header">
                        <span class="title"></span>
                        <span class="close"></span>
                    </div>
                    <div class="desc">
                        <span></span>
                    </div>
                </div>
            </li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
        </ul>
    </div>
</body>

</html>
```

主体结构较简单，不做过多的解释，这里需要注意一点，我没有直接把\<li>下的元素直接放在\<li>内，而是用一层\<div class="item">包裹了一下，这是为了实现功能一所做的准备：在页面加载伊始，要把图片、文字等内容一起移上去，而且移动方法并不是把\<li>移上去，因为在加载的时候\<li>就在页面中没有动，灰色的位置，所以要单独再包裹一层容器，将子元素整体移上去

## css

详细的思路参照css代码注释，这里强调几点注意点

+ 关于实现思路

  观察整个代码，其实js部分的代码非常少，主要就是通过css的巧妙设计，减少了js的代码，在这个demo的整体需求中，主要变换的对象无非就两类：被点击的和其他的；所以我们可以通过给被点击的元素添加一个`.active` 类名达到区分的效果，但要注意的是，我们要通过css 实现区分这两种状态，某一个和其他的，很自然的想到了反选伪类，我们使用反选伪类`:not()` 可以很轻松的把这两类分开，但是当页面刚加载的时候，并没有任何一个元素是被点击的，而我们css中已经写好了反选伪类，这个反选伪类就会把所有的元素都选择出来，达不到分类的效果了，所以还要使用一点点技巧，让反选伪类选择器在页面某一个元素被点击后才生效，我们可以给最外层的 `.wrapper` 也设置两种状态，激活状态和未激活状态，当页面中某一个元素被点击时，让它变成激活状态，这样通过 `.wrapper` 和 `.active-wrapper` 就可以区分有没有点击操作，从而让反选伪类有效

+ 关于高度逐渐变成0的实现方法

  + 沿x轴旋转

    让元素再2d平面内，沿x轴旋转90deg，视觉上高度逐渐变成0

  + 侧轴上居中

    因为这几个图片容器的布局使用flex实现的，所以可以让元素高度逐渐变成0的同时，始终保持他们的对齐方式是侧轴上居中，这样也可以达到效果

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
            * {
                margin: 0px;
                padding: 0px;
                list-style: none;
            }
            .wrapper {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 700px;
                height: 400px;
                border: 1px solid #000;
            }
            .wrapper ul {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
            }
            .wrapper ul li {
                width: 18%;
                height: 100%;
                background-color: orange;
            }
    
            .wrapper ul li:hover {
                height: 0;
                transition: all 1s linear;
            }
            
        </style>
    </head>
    
    <body>
        <div class="wrapper">
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </body>
    
    </html>
    ```

    这是一个小demo，用以配合理解

+ 关于transition动画丢失的问题

  我们都知道transition动画是实现元素从一种状态变到另一种状态时的过渡效果，如果只有两种状态，那么对应关系明确，不存在冲突的情况；如果有多种状态，且他们之间的对应关系不明确，那元素状态改变时，它该选择哪种状态呢？显然，他会选择优先级最高的那个选择器选择出来的元素状态，问题是这个选择器选择出来的内容并不都是我们想要改变的内容，有些我们想改变的内容在优先级较低的元素状态中，那么这时这些状态就会被忽略，就会造成一些过渡动画丢失的问题，解决方法是：如果有因为优先级低而被忽略的元素，将这些元素中被忽略的内容单独拿出来放到一个标签中，通过选择新的标签来实现它的过渡效果，这个项目中css代码中的最后两个代码块，选择span就是为了解决这个问题