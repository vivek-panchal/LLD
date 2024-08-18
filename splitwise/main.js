const User = require('./models/User');
const UserService = require('./services/UserService');
const ExpenseService = require('./services/ExpenseService');
const InputHandler = require('./utils/InputHandler');

const userService = new UserService();
const expenseService = new ExpenseService(userService);
const inputHandler = new InputHandler(userService, expenseService);

// Sample Users
userService.addUser(new User('u1', 'User1', 'user1@example.com', '1234567890'));
userService.addUser(new User('u2', 'User2', 'user2@example.com', '1234567891'));
userService.addUser(new User('u3', 'User3', 'user3@example.com', '1234567892'));
userService.addUser(new User('u4', 'User4', 'user4@example.com', '1234567893'));

// Simulate user input
const inputs = [
    'SHOW',
    'SHOW u1',
    'EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL',
    'SHOW u4',
    'SHOW u1',
    'EXPENSE u1 1250 2 u2 u3 EXACT 370 880',
    'SHOW',
    'EXPENSE u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20',
    'SHOW
    'SHOW u1',
    'SHOW'
];

inputs.forEach(input => {
    inputHandler.handleInput(input);
});
