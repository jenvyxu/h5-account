import Notification from 'rc-notification';
import './index.scss'

let notification: any
Notification.newInstance({
  maxCount: 5,
  prefixCls: 'money-notification-container',
  style: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)'
  }
}, (n) => {notification = n});

export default class Message {
  constructor() {
    this.defaultMessage ='请输入内容'
  }
  defaultMessage: string
  success(msg?: string, duration?: number, callback?: () => void) {
    this.notificationFn(msg, duration, { background:'#a6f499' },callback)
  }
  error(msg?: string, duration?: number, callback?: () => void) {
    this.notificationFn(msg, duration, { background:'#ffcac8' },callback)
  }
  info(msg?: string, duration?: number, callback?: () => void) {
    this.notificationFn(msg, duration, { background:' #89d2fc' },callback)
  }
  warning(msg?: string, duration?: number, callback?: () => void) {
    this.notificationFn(msg, duration, { background:' #feea98' },callback)
  }
  notificationFn(msg?: string, duration?: number, style?: object, callback?: () => void) {
    let message = msg ? msg : this.defaultMessage
    notification.notice({
      content: message,
      duration: duration ? duration : 1,
      onClose: callback,
      style
    })
  }
}
