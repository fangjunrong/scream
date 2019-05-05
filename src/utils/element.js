import {
  Container,
  Header,
  Main,
  Progress,
  Message,
  MessageBox,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Button,
  Upload,
  Form,
  FormItem,
  Switch,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  DatePicker,
  Option,
  Select,
  Input,
  Tree,
  Dialog,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  Carousel,
  CarouselItem,
  Popover,
  Pagination
} from 'element-ui'

const element = {
  install: function(Vue) {
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Main)
    Vue.use(Progress)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Submenu)
    Vue.use(Button)
    Vue.use(Upload)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Switch)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(DatePicker)
    Vue.use(Option)
    Vue.use(Select)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Popover)
    Vue.use(Pagination)
    Vue.prototype.$message = Message // 指令式触发，需要单独特殊引用 Notification同理
    const MsgBox = MessageBox
    Vue.prototype.$msgbox = MsgBox
    Vue.prototype.$alert = MsgBox.alert
    Vue.prototype.$confirm = MsgBox.confirm
    Vue.prototype.$prompt = MsgBox.prompt
  }
}
export default element
