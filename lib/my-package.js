'use babel';
//入口文件  丢失的话 会找index.js
import MyPackageView from './my-package-view';//加载自己的视图文件
import { CompositeDisposable } from 'atom';//导入atom的包

export default {

  myPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackageView = new MyPackageView(state.myPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackageView.getElement(), //指定面板元素
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view  注册命令
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy(); //面板清理
    this.subscriptions.dispose();//事件清理
    this.myPackageView.destroy();// 视图清理
  },

  serialize() {
    return {
      myPackageViewState: this.myPackageView.serialize()
    };
  },

  toggle() {
    console.log('zhangcheng first package');
    console.log('MyPackage was toggled!');

    if (this.modalPanel.isVisible()){
        this.modalPanel.hide()
    } else {
        editor = atom.workspace.getActiveTextEditor()
        if( editor == ''){
            return
        }
        words = editor.getText().split(/\s+/).length
        this.myPackageView.setCount(words)
        this.modalPanel.show()
    }

  }

};
