# API Documentation

## I. USERS - getAllTheUser
- **HTTP Method**: GET
- **URL**: `/users`
- **Query Params**: -
- **Path Params**: -
- **Post Body**: -
- **Return/Fail**: Array of user objects

## I. USERS - getUserById
- **HTTP Method**: GET
- **URL**: `/users/`
- **Query Params**: None
- **Path Params**: userID
- **Post Body**: None
- **Return/Fail**: Array of user objects

## I. USERS - None
- **HTTP Method**: None
- **URL**: `None`
- **Query Params**: None
- **Path Params**: userID
- **Post Body**: None
- **Return/Fail**: User object

## 3. Create User - createAUser
- **HTTP Method**: POST
- **URL**: `/users`
- **Query Params**: -
- **Path Params**: None
- **Post Body**: user details object
- **Return/Fail**: confirnamtion and the created user object

## II. Cases: - GetAllCases
- **HTTP Method**: GET
- **URL**: `/cases`
- **Query Params**: ?category=civil (Optional
- **Path Params**: None
- **Post Body**: None
- **Return/Fail**: 

## II. Cases: - GetCaseById
- **HTTP Method**: GET
- **URL**: `/cases/`
- **Query Params**: None
- **Path Params**: caseId
- **Post Body**: None
- **Return/Fail**: 

## II. Cases: - CreateCase
- **HTTP Method**: POST
- **URL**: `/cases`
- **Query Params**: None
- **Path Params**: caseId
- **Post Body**: None
- **Return/Fail**: 

## II. Cases: - CreateCase
- **HTTP Method**: POST
- **URL**: `/cases`
- **Query Params**: None
- **Path Params**: None
- **Post Body**: None
- **Return/Fail**: 

## II. Cases: - BookmarkCase
- **HTTP Method**: POST
- **URL**: `/lawyers/`
- **Query Params**: None
- **Path Params**: lawyerId, caseId
- **Post Body**: None
- **Return/Fail**: 

## II. Cases: - GetBookmarkedCases
- **HTTP Method**: GET
- **URL**: `/lawyers/`
- **Query Params**: None
- **Path Params**: lawyerId
- **Post Body**: None
- **Return/Fail**: 

## II. Cases: - None
- **HTTP Method**: None
- **URL**: `/lawyers/`
- **Query Params**: None
- **Path Params**: lawyerId
- **Post Body**: None
- **Return/Fail**: 

