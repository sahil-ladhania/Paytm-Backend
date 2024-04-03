import z from 'zod';

const transactionInputSchema = z.object({
    userId : z.string(),
    balanceAmount : z.number().positive()
})

export const transactionInputCheck = (req , res , next) => {
    const data = req.body;
    transactionInputSchema.parseAsync(data)
        .then(() => {
            res.status(200).send({
                Message: "Transaction Amount Input Check Successful ..."
            });
            return next();
        })
        .catch((error) => {
            res.status(500).send({
                Error: `Incorrect User Input: ${error} !!!`
            });
        })
}