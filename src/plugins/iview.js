import Vue from 'vue'
// import { Button } from 'view-design'

// import iView from 'iview'
// import iView from 'iview/dist/iview.js'
import {ButtonGroup, Button, Icon, Row, Col, Card, Divider, Menu, 
    Submenu, MenuItem, Tabs, TabPane, Page, Badge, Input, 
    RadioGroup, Radio, CheckboxGroup, Checkbox, Switch, Table, 
    Select, Option, AutoComplete, DatePicker, InputNumber, Upload, 
    Form, FormItem, Message, Notice, Modal, Tooltip, Poptip, Spin,  } from 'iview'
    // Form, FormItem, Message, Notice, Modal, Tooltip, Poptip, Spin,  } from 'iview/dist/iview.js'
// Vue.use(iView,{
//     size: 'large',
// })

Vue.component('ButtonGroup', ButtonGroup)
Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Card', Card)
Vue.component('Divider', Divider)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Page', Page)
Vue.component('Badge', Badge)
Vue.component('Input', Input)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
Vue.component('i-switch', Switch)
Vue.component('Table', Table)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('AutoComplete', AutoComplete)
Vue.component('DatePicker', DatePicker)
Vue.component('InputNumber', InputNumber)
Vue.component('Upload', Upload)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Message', Message)
Vue.component('Notice', Notice)
Vue.component('Modal', Modal)
Vue.component('Tooltip', Tooltip)
Vue.component('Poptip', Poptip)
Vue.component('Spin', Spin)

Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
Vue.prototype.$Modal = Modal

// Vue.use(Button)
// Vue.use(Icon)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Card)
// Vue.use(Divider)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Page)
// Vue.use(Badge)
// Vue.use(Input)
// Vue.use(RadioGroup)
// Vue.use(Radio)
// Vue.use(CheckboxGroup)
// Vue.use(Checkbox)
// Vue.use(Switch)
// Vue.use(Table)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(AutoComplete)
// Vue.use(DatePicker)
// Vue.use(InputNumber)
// Vue.use(Upload)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Message)
// Vue.use(Notice)
// Vue.use(Modal)
// Vue.use(Tooltip)
// Vue.use(Poptip)
// Vue.use(Spin)

// import 'view-design/dist/styles/iview.css'
import '../styles/theme/index.less'
