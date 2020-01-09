<!DOCTYPE html>
<html lang="en" >
<head>
<meta charset="UTF-8">
  <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
  <title><?php echo(strip_tags($msg));?>...</title>

<link rel="stylesheet" href="css/style.css">
<style>
body {
  background: #161616;
  font: 12px normal Verdana, Arial, Helvetica, sans-serif;
}

#ajaxloader2 {
  margin: 30px auto 0;
}
#ajaxloader2 .outer {
  border: 5px solid rgba(0, 183, 229, 0.9);
  opacity: .9;
  width: 10rem;
  height: 10rem;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 35px rgba(0, 61, 76, 0.9);
  -moz-box-shadow: 0 0 35px rgba(0, 61, 76, 0.9);
  box-shadow: 0 0 35px rgba(0, 61, 76, 0.9);
  -webkit-animation: spin-right 0.5s linear infinite normal;
  -moz-animation: spin-right 0.5s linear infinite normal;
  -ms-animation: spin-right 0.5s linear infinite normal;
  animation: spin-right 0.5s linear infinite normal;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
  margin: 0 auto;
}
#ajaxloader2 .inner {
  display: block;
  width: 30px;
  height: 30px;
  border: 5px solid rgba(0, 183, 229, 0.9);
  opacity: .9;
  border-radius: 50%;
  border-left-color: transparent;
  border-bottom-color: transparent;
  -webkit-box-shadow: 0 0 35px rgba(0, 61, 76, 0.9);
  -moz-box-shadow: 0 0 35px rgba(0, 61, 76, 0.9);
  box-shadow: 0 0 35px rgba(0, 61, 76, 0.9);
  position: relative;
  top: -50px;
  margin: 0 auto;
  -webkit-animation: spin-left 0.5s linear infinite normal;
  -moz-animation: spin-left 0.5s linear infinite normal;
  -ms-animation: spin-left 0.5s linear infinite normal;
  animation: spin-left 0.5s linear infinite normal;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
}
#shadowloader {
  display: block;
  position: relative;
  overflow: hidden;
  width: 5em;
  margin: 30px auto;
  padding: 20px 10px;
}
#shadowloader span {
  display: block;
  float: left;
  width: 0.5em;
  height: 3em;
  margin: 0 0.5em 0 0;
  background: #635863;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='@color1', endColorstr='@color2');
  background-image: -webkit-linear-gradient(top, #635863 25%, #3d353b);
  background-image: -moz-linear-gradient(top, #635863 25%, #3d353b);
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0), 1px 1px 1px 0 rgba(0, 0, 0, 0), 1px 1px 1px 0 rgba(0, 0, 0, 0);
  -webkit-animation: pound 0.7s ease-in-out infinite alternate;
  -moz-animation: pound 0.7s ease-in-out infinite alternate;
  -ms-animation: pound 0.7s ease-in-out infinite alternate;
  animation: pound 0.7s ease-in-out infinite alternate;
  -webkit-animation-delay: 0.05s;
  -moz-animation-delay: 0.05s;
  -o-animation-delay: 0.05s;
  animation-delay: 0.05s;
  -webkit-transform-origin: center bottom;
  -moz-transform-origin: center bottom;
  -ms-transform-origin: center bottom;
  transform-origin: center bottom;
}
#shadowloader span:nth-child(2) {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
#shadowloader span:nth-child(3) {
  -webkit-animation-delay: 0.35s;
  -moz-animation-delay: 0.35s;
  -o-animation-delay: 0.35s;
  animation-delay: 0.35s;
}
#shadowloader span:nth-child(4) {
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
  -o-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
#shadowloader span:nth-child(5) {
  -webkit-animation-delay: 0.65s;
  -moz-animation-delay: 0.65s;
  -o-animation-delay: 0.65s;
  animation-delay: 0.65s;
}
h1.loadingtext {
  text-align: center;
  text-transform: uppercase;
  font-family: 'Nunito', sans-serif;
  font-size: 4.6875em;
  color: transparent;
  letter-spacing: 0.01em;
}
h1.loadingtext span {
  text-shadow: 0 0 2px rgba(22, 22, 22, 0.9), 0 15px 25px rgba(0, 0, 0, 0.3), 0 -2px 3px rgba(0, 0, 0, 0.1), 0 -5px 10px rgba(22, 22, 22, 0.5), 0 5px 10px rgba(0, 0, 0, 0.3), 0 3px 4px rgba(22, 22, 22, 0.2), 0 0 20px rgba(22, 22, 22, 0.45);
  -webkit-animation: letters 0.85s ease-in-out infinite alternate;
  -moz-animation: letters 0.85s ease-in-out infinite alternate;
  -ms-animation: letters 0.85s ease-in-out infinite alternate;
  animation: letters 0.85s ease-in-out infinite alternate;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
}
h1.loadingtext span:nth-child(2) {
  -webkit-animation-delay: 0.15s;
  -moz-animation-delay: 0.15s;
  -o-animation-delay: 0.15s;
  animation-delay: 0.15s;
}
h1.loadingtext span:nth-child(3) {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
h1.loadingtext span:nth-child(4) {
  -webkit-animation-delay: 0.45s;
  -moz-animation-delay: 0.45s;
  -o-animation-delay: 0.45s;
  animation-delay: 0.45s;
}
h1.loadingtext span:nth-child(5) {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
h1.loadingtext span:nth-child(6) {
  -webkit-animation-delay: 0.75s;
  -moz-animation-delay: 0.75s;
  -o-animation-delay: 0.75s;
  animation-delay: 0.75s;
}
h1.loadingtext span:nth-child(7) {
  -webkit-animation-delay: 0.9s;
  -moz-animation-delay: 0.9s;
  -o-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
@keyframes spin-right {
  from {
    transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: rotate(180deg);
    opacity: 1.0;
  }
  to {
    transform: rotate(360deg);
    opacity: 0.2;
  }
}
@-moz-keyframes spin-right {
  from {
    -moz-transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    -moz-transform: rotate(180deg);
    opacity: 1.0;
  }
  to {
    -moz-transform: rotate(360deg);
    opacity: 0.2;
  }
}
@-webkit-keyframes spin-right {
  from {
    -webkit-transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    -webkit-transform: rotate(180deg);
    opacity: 1.0;
  }
  to {
    -webkit-transform: rotate(360deg);
    opacity: 0.2;
  }
}
@keyframes spin-left {
  from {
    transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: rotate(-180deg);
    opacity: 1.0;
  }
  to {
    transform: rotate(-360deg);
    opacity: 0.2;
  }
}
@-moz-keyframes spin-left {
  from {
    -moz-transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    -moz-transform: rotate(-180deg);
    opacity: 1.0;
  }
  to {
    -moz-transform: rotate(-360deg);
    opacity: 0.2;
  }
}
@-webkit-keyframes spin-left {
  from {
    -webkit-transform: rotate(0deg);
    opacity: 0.2;
  }
  50% {
    -webkit-transform: rotate(-180deg);
    opacity: 1.0;
  }
  to {
    -webkit-transform: rotate(-360deg);
    opacity: 0.2;
  }
}
@keyframes spin-pulse {
  from {
    transform: rotate(160deg);
    opacity: 0;
    box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
  }
  50% {
    transform: rotate(145deg);
    opacity: 1;
  }
  to {
    transform: rotate(-320deg);
    opacity: 0;
  }
}
@-moz-keyframes spin-pulse {
  from {
    -moz-transform: rotate(160deg);
    opacity: 0;
    box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
  }
  50% {
    -moz-transform: rotate(145deg);
    opacity: 1;
  }
  to {
    -moz-transform: rotate(-320deg);
    opacity: 0;
  }
}
@-webkit-keyframes spin-pulse {
  from {
    -webkit-transform: rotate(160deg);
    opacity: 0;
    box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
  }
  50% {
    -webkit-transform: rotate(145deg);
    opacity: 1;
  }
  to {
    -webkit-transform: rotate(-320deg);
    opacity: 0;
  }
}
@keyframes pulse {
  from {
    transform: scale(1.2);
    opacity: 1;
  }
  to {
    transform: scale(0.7);
    opacity: 0.1;
  }
}
@-moz-keyframes pulse {
  from {
    -moz-transform: scale(1.2);
    opacity: 1;
  }
  to {
    -moz-transform: scale(0.7);
    opacity: 0.1;
  }
}
@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale(1.2);
    opacity: 1;
  }
  to {
    -webkit-transform: scale(0.7);
    opacity: 0.1;
  }
}
@keyframes ball-circlex {
  from {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(25px);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(-25px);
    animation-timing-function: ease-in;
  }
  to {
    transform: translateX(0px);
  }
}
@-moz-keyframes ball-circlex {
  from {
    -moz-transform: translateX(0px);
  }
  25% {
    -moz-transform: translateX(25px);
    -moz-animation-timing-function: ease-in;
  }
  50% {
    -moz-transform: translateX(0px);
  }
  75% {
    -moz-transform: translateX(-25px);
    -moz-animation-timing-function: ease-in;
  }
  to {
    -moz-transform: translateX(0px);
  }
}
@-webkit-keyframes ball-circlex {
  from {
    -webkit-transform: translateX(0px);
  }
  25% {
    -webkit-transform: translateX(25px);
    -webkit-animation-timing-function: ease-in;
  }
  50% {
    -webkit-transform: translateX(0px);
  }
  75% {
    -webkit-transform: translateX(-25px);
    -webkit-animation-timing-function: ease-in;
  }
  to {
    -webkit-transform: translateX(0px);
  }
}
@keyframes facebook-pulse {
  10% {
    margin-top: 5px;
    height: 22px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  20% {
    margin-top: 0px;
    height: 32px;
    border-color: #d1d7e2;
    background-color: #bac5db;
  }
  30% {
    margin-top: 1px;
    height: 30px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  40% {
    margin-top: 3px;
    height: 26px;
  }
  50% {
    margin-top: 5px;
    height: 22px;
  }
  60% {
    margin-top: 6px;
    height: 18px;
  }
}
@-moz-keyframes facebook-pulse {
  10% {
    margin-top: 5px;
    height: 22px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  20% {
    margin-top: 0px;
    height: 32px;
    border-color: #d1d7e2;
    background-color: #bac5db;
  }
  30% {
    margin-top: 1px;
    height: 30px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  40% {
    margin-top: 3px;
    height: 26px;
  }
  50% {
    margin-top: 5px;
    height: 22px;
  }
  60% {
    margin-top: 6px;
    height: 18px;
  }
}
@-webkit-keyframes facebook-pulse {
  10% {
    margin-top: 5px;
    height: 22px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  20% {
    margin-top: 0px;
    height: 32px;
    border-color: #d1d7e2;
    background-color: #bac5db;
  }
  30% {
    margin-top: 1px;
    height: 30px;
    border-color: #d1d8e6;
    background-color: #bac5db;
  }
  40% {
    margin-top: 3px;
    height: 26px;
  }
  50% {
    margin-top: 5px;
    height: 22px;
  }
  60% {
    margin-top: 6px;
    height: 18px;
  }
}
@keyframes loadpulse-ball {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
@-moz-keyframes loadpulse-ball {
  from {
    -moz-transform: scale(0);
  }
  to {
    -moz-transform: scale(1);
  }
}
@-webkit-keyframes loadpulse-ball {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}
@keyframes loadpulse-glow {
  from {
    transform: scale(0);
    opacity: 0;
  }
  10% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.75);
    opacity: 0;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}
@-moz-keyframes loadpulse-glow {
  from {
    -moz-transform: scale(0);
    opacity: 0;
  }
  10% {
    -moz-transform: scale(1);
    opacity: 0.5;
  }
  50% {
    -moz-transform: scale(1.75);
    opacity: 0;
  }
  to {
    -moz-transform: scale(0);
    opacity: 0;
  }
}
@-webkit-keyframes loadpulse-glow {
  from {
    -webkit-transform: scale(0);
    opacity: 0;
  }
  10% {
    -webkit-transform: scale(1);
    opacity: 0.5;
  }
  50% {
    -webkit-transform: scale(1.75);
    opacity: 0;
  }
  to {
    -webkit-transform: scale(0);
    opacity: 0;
  }
}
@keyframes pound {
  to {
    transform: scale(1.2);
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.65), 2px 6px 12px 0 rgba(0, 0, 0, 0.5), 3px 8px 15px 0 rgba(0, 0, 0, 0.45);
  }
}
@-moz-keyframes pound {
  to {
    -moz-transform: scale(1.2);
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.65), 2px 6px 12px 0 rgba(0, 0, 0, 0.5), 3px 8px 15px 0 rgba(0, 0, 0, 0.45);
  }
}
@-webkit-keyframes pound {
  to {
    -webkit-transform: scale(1.2);
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.65), 2px 6px 12px 0 rgba(0, 0, 0, 0.5), 3px 8px 15px 0 rgba(0, 0, 0, 0.45);
  }
}
@keyframes letters {
  to {
    text-shadow: 0 0 2px rgba(204, 208, 212, 0.2), 0 0 3px rgba(0, 0, 0, 0.02), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(255, 255, 255, 0);
  }
}
@-moz-keyframes letters {
  to {
    text-shadow: 0 0 2px rgba(204, 208, 212, 0.2), 0 0 3px rgba(0, 0, 0, 0.02), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(255, 255, 255, 0);
  }
}
@-webkit-keyframes letters {
  to {
    text-shadow: 0 0 2px rgba(22, 22, 22, 0.2), 0 0 3px rgba(0, 0, 0, 0.02), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0);
  }
}

.test{
  text-align: center;
  color: #fff;
}

</style>
</head>

<body>
<div style="height:4rem"></div>
   <?php switch ($code) {?>
   <?php case 1:?>
<div id="ajaxloader2">
  <div class="outer"></div>
  <div class="inner"></div>
</div>
<div class="test">
    <h1><?php echo(strip_tags($msg));?>...</h1>
</div>
<?php break;?>
<?php case 0:?>

  <div class="test">
    <h1>  <?php echo(strip_tags($msg));?></h1>
</div>
  <?php break;?>
   <?php } ?>
  
          <p class="jump" style="display:none">
            页面自动 <a id="href" href="<?php echo($url);?>">跳转</a> 等待时间： <b id="wait"><?php echo($wait);?></b>
        </p>
    </div>
    <script type="text/javascript">
        (function(){
            var wait = document.getElementById('wait'),
                href = document.getElementById('href').href;
            var interval = setInterval(function(){
                var time = --wait.innerHTML;

                    location.href = href;
                    clearInterval(interval);
 
            }, 1000);
        })();
    </script>
</body>

</html>
