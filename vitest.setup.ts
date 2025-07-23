if (process.env.NODE_ENV !== 'test') {
    throw new Error(
        '🚨 Atenção: Você está rodando testes sem NODE_ENV=test!\n' +
        'Use "npm run test" para rodar no banco de testes isolado.'
    )
}