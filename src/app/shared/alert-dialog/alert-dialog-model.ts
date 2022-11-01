export class AlertDialogModel {
  title:string;
  message:string;
  type:string;
  confirmButton:AlertButtonModel = {
    text: "yes",
    color: "primary",
    visible:false
  };
  dismissButton: AlertButtonModel  = {
    text: "cancel",
    visible:false
  };
}


class AlertButtonModel{
  text?:string;
  color?:string;
  visible:boolean;
}
