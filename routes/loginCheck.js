const express = require('express');
const router = express.Router();
const { encrypt } = require('../utils(dal)/encryption/encryption');
const { getUserByEmail } = require('../utils(dal)/password reset/userByEmail');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../services/tokenService');


router.post('/', async (req, res) => {
    const { password, email } = req.body;

    try {

        const validUser = await getUserByEmail(email);
        if(!validUser) {
            return res.status(400).json({message: 'Not a valid e-mail.'});
        }

        if (!password) {
            return res.status(200).json({ message: 'Email is valid.'})
        } /* This is used to get the password input ready */

        const match = await bcrypt.compare(password, validUser.password)
        console.log(match)
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid password.'})
        }
        
        const userData = {
            userId:  validUser.user_id,
            role: validUser.role
        };
        const token = generateJWT(userData);
        /* const encryptedUserRole = encrypt(password, validUser.role); */
        res.cookie('authToken', token, { httpOnly: true});
        /* res.cookie('data', data, { httpOnly: false }); */
        res.status(200).json({ success: true, message: "Login successful!", role: validUser.role });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
        console.error('Error in login route: ', error)
    }
});

module.exports = router;


/*

// Definition for singly-linked list node
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

// Utility function to create a linked list from an array of values
function createLinkedListFromArray(arr) {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Function to find the middle node
const findNode = (head) => {
    if (!head || !head.next) return head;
    let slow = head;
    let fast = head;
    do {
        if (!fast.next || !fast.next.next) {
            break;
        } 
        slow = slow.next;
        fast = fast.next.next;
    } while (true);
    return slow;
};

// Test
const arr = [1, 2, 3, 4, 5, 6, 7];
const head = createLinkedListFromArray(arr);
const middleNode = findNode(head);
console.log(middleNode.val);  */