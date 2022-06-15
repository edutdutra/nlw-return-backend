import {SubmitFeedbackUseCase} from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exempla comment',
            screenshot: 'data:image/png;base64,uahxuahsuhauaushdas'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should no be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exempla comment',
            screenshot: 'data:image/png;base64,uahxuahsuhauaushdas'
        })).rejects.toThrow();
    })

    it('should no be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,uahxuahsuhauaushdas'
        })).rejects.toThrow();
    })

    it('should no be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'ta todo bugado',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    })

});
