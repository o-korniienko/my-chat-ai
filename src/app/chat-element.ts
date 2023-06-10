import {ResponseItem} from './response-item'


export class ChatElement{
  constructor(
    public question: string,
    public response: ResponseItem[],
  ){}
}
