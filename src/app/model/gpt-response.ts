export class GptResponse{
  constructor(
    public question: string,
    public answer: string,
    public error: string,
  ){}
}
