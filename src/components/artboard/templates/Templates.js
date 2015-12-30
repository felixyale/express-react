export var TextTpl = [{
  config: {
    linkAble: false
  },
  name: '标题1',
  html: `
    <div style="
    border: 0;
    margin: 1em 0 2.5em;
    padding: 1px;
    clear: both;">
      <div style="
      font-size: 1em;
      font-family: inherit;
      font-style: normal;
      font-weight: inherit;
      text-align: center;
      text-decoration: inherit;
      color: rgb(255, 255, 255);
      border-color: rgb(249, 110, 87);
      background-color: transparent;">
        <div style="height: 2em;">
          <div style="
          display: inline-block;
          margin: 0px 15%;
          width: 70%;
          height: 2em;
          background-color: rgb(249, 110, 87);">
            <div style="
            height: 100%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            line-height: 1;
            padding: 0.5em 0px;
            font-size: 1em;
            font-family: inherit;
            font-style: normal;
            color: rgb(255, 255, 255);
            background-color: rgba(255, 255, 255, 0.2);
            box-sizing: border-box;"
            contenteditable="true">
              <div>请输入标题</div>
            </div>
          </div>
        </div>
        <div style="margin-top: -1.6em;margin-bottom: 2.1em;clear: both;">
          <div style="width: 25%;
          height: 0px;
          float: left;
          border-top-width: 1em;
          border-top-style: solid;
          border-top-color: rgb(249, 110, 87);
          border-bottom-width: 1em;
          border-bottom-style: solid;
          border-bottom-color: rgb(249, 110, 87);
          border-left-width: 1em !important;
          border-left-style: solid !important;
          border-left-color: transparent !important;
          font-size: 1em;"></div>
          <div style="width: 25%;
          height: 0px;
          float: right;
          border-top-width: 1em;
          border-top-style: solid;
          border-top-color: rgb(249, 110, 87);
          border-bottom-width: 1em;
          border-bottom-style: solid;
          border-bottom-color: rgb(249, 110, 87);
          border-right-width: 1em !important;
          border-right-style: solid !important;
          border-right-color: transparent !important;
          font-size: 1em;"></div>
        </div>
      </div>
    </div>
  `
}, {
  config: {
    linkAble: true
  },
  name: '标题2',
  html: `
    <h2 style="font-size: 1em;
      font-family: inherit;
      font-style: normal;
      font-weight: inherit;
      text-align: inherit;
      text-decoration: inherit;
      color: inherit;"
      contenteditable="true">标题</h2>
  `
}, {
  config: {
    linkAble: true
  },
  name: '标题3',
  html: `
    <p contenteditable="true" style="line-height: 1.5rem;">文本内容</p>
  `    
}, {
  config: {
    linkAble: true
  },
  name: 'link1',
  html: `
    <p contenteditable="true" style="line-height: 1.5rem;"><a href="#">link</a></p>
  `    
}];

export var ImageTpl = [{
  config: {
    linkAble: true
  },
  name: '图片1',
  html: `
    <img class="img-block" src="http://localhost:8080/esf/react/17a2a5262b6d7cfe05019dd5f1f3a4b3.png"/>
  `
}];
