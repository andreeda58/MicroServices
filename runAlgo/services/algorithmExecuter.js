module.exports = class AlgorithmExecuter {

    runRequest(first, second, operation) {
        let result;
        switch (operation) {
            case '+':
            result = first + second;
            break;
            case '-':
            result = first - second;
            break;
            case '*':
            result = first * second;
            break;
            case '/':
            result = first / second;
            break;
        }
        return result;
    }
}