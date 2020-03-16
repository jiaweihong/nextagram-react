import React, {useState, useEffect} from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from "axios"
import { toast } from 'react-toastify';

function ModalForm(props) {
    //isModalOpen is set to false at the start so that the modal will only open when the "open" button is pressed
    const [isModalOpen, changeModalState] = useState(false)
    
    //isLogin is set to true so that when you open modal it always return the login page first. Then if it is false it will change run other line of code
    const [isLogin, changeLogin] = useState(true)

    //To make modal open up
    const modalClick = () => {
        changeModalState(!isModalOpen)
    } 
    //To allow a button to change forms
    const formClick = () => {
        changeLogin(!isLogin)
    }

    //This is to save user sign up info and save it and then post it
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userUsername, setUserUsername] = useState("")
    
    const updateSignUpEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const updateSignUpPassword = (e) => {
        setUserPassword(e.target.value)
    }

    //saves user sign up info and validation
    const [id, setId] = useState(undefined)
    const [usernameForm, changeUsernameForm] = useState({valid: false, invalid: false})
    const updateAndCheckSignUpUsername = (e) => {
        const saveEvent = e.target.value //you have to save your event before making axios call because it will change the event
        clearTimeout(id)
        if (e.target.value.length >= 6){  // if name >= 6
            const timeoutId = setTimeout(() => { //setTimeout will mean that it will wait 0.5 seconds before calling axious, as soon as setTimeout is called it is given an identifier to the function called, which we then save it to a variable called timeoutId. On the next keystroke we will clear the previous axious called thereby removing the queue.
                axios
                    .get(
                        `https://insta.nextacademy.com/api/v1/users/check_name?username=${saveEvent}`
                    )
                    .then(response => {
                        if (response.data.valid){ // and name is valid will show green box
                            setUserUsername(saveEvent)
                            changeUsernameForm({valid: true, invalid: false})
                        } else { // and name is invalid will show red box
                            setUserUsername(saveEvent)
                            changeUsernameForm({valid: false, invalid: true})
                        }
                    })
            }
            , 100)
            setId(timeoutId) // this sets my identifier to                                                      
        } else if (saveEvent == "") { // if name is empty will show grey box
            changeUsernameForm({valid: false, invalid: false})
        } else { // if name is less than 6 will show red box
            setUserUsername(saveEvent)
            changeUsernameForm({valid: false, invalid: true})
        }
    }

    //To allow users to sign up
    const sendSignUpRequest = () => {
        console.log({userEmail})
        axios({
            method: "POST",
            url: "https://insta.nextacademy.com/api/v1/users/",
            data: {
                username : userUsername,
                email: userEmail,
                password: userPassword
            }
        })
        .then(response => {
            console.log(response)
            toast.success('🦄 Sign Up is Succesful!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            changeModalState(false)
        })
        .catch(error => {
            console.error(error.response.data.message)
            const errorMessage = error.response.data.message
            toast.error(errorMessage.join(', '), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        })
    }

    //This is to check if the 2 passwords match
    const [firstPassword, setFirstPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")
    const [firstPasswordForm, changeFirstPasswordForm] = useState({valid: false, invalid: false})
    const [comparePasswordForm, setComparePasswordForm] = useState({valid: false, invalid: false})

    const passwordCheck = (p1, p2) => { // this function will trigger anytime first or second password is updated
        //This first part will check if first password greater than or equal to 8
        if (p1.length >= 8){
            changeFirstPasswordForm({valid: true, invalid: false})
        } else if (p1 == "") {
            changeFirstPasswordForm({valid: false, invalid: false})
        } else {
            changeFirstPasswordForm({valid: false, invalid: true})
        }

        //This part will check if both the values are equal to each other
        if (p2 == p1){
            setComparePasswordForm({valid: true, invalid: false})
        } else if (p2 == "") {
            setComparePasswordForm({valid: false, invalid: false})
        } else {
            setComparePasswordForm({valid: false, invalid: true})
        }
    }
    
    const updateAndCheckFirstPassword = (e) => {
        setFirstPassword(e.target.value)
        passwordCheck(e.target.value, secondPassword)
    }

    const updateAndCheckSecondPassword = (e) => {
        setSecondPassword(e.target.value)
        passwordCheck(firstPassword, e.target.value)
    }

    
    //To allow users to login
    const [loginUsername, setLoginUsername] = useState("")
    const updateLoginUsername = (e) => {
        setLoginUsername(e.target.value)
    }
    const [loginPassword, setLoginPassword] = useState("")
    const updateLoginPassword = (e) => {
        setLoginPassword(e.target.value)
    }

    const sendLoginRequest = () => {
        axios({
            method: "POST",
            header: 'Content-Type: application/json',
            url: "https://insta.nextacademy.com/api/v1/login",
            data: {
                username : loginUsername,
                password: loginPassword
            }
        })
        .then(response => {
            console.log(response)
            toast.success('🦄 Sign In is Succesful!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            localStorage.setItem("jwt", response.data.auth_token)
            changeModalState(false)
            props.logIn(true) // this is me accessing a function from a parent componenet
        })
        .catch(error => {
            console.error(error.response)
        });
    }





    return (
        <div>
            <button onClick={() => {modalClick(); changeLogin(true)}}>Login</button>
            <button onClick={() => {modalClick(); changeLogin(false)}} >Sign Up</button>
            <Modal isOpen={isModalOpen} >
                {
                    isLogin ? 
                        (
                            <>
                                <ModalHeader>Sign In</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Label>Input Username</Label>
                                            <Input type="text" placeholder="my_name" onChange={updateLoginUsername}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Input Password</Label>
                                            <Input type="password" placeholder="password123" onChange={updateLoginPassword}/>
                                        </FormGroup>
                                        <Button color="success" onClick={sendLoginRequest}>Login</Button>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={formClick}>Sign Up</Button>{' '}
                                    <Button color="secondary" onClick={modalClick}>Cancel</Button>
                                </ModalFooter>
                            </>
                        )
                        : //when isLogin is false then the false code will run
                        (
                            <>
                                <ModalHeader>Sign Up</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Label>Choose a Username</Label>
                                            <Input {...usernameForm} type="text" placeholder="my_name" onChange={updateAndCheckSignUpUsername} />
                                            <FormFeedback invalid>Username must be greater than 5 characters or Username is taken</FormFeedback>
                                            <FormFeedback valid>Username is valid</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Choose an Email</Label>
                                            <Input type="email" placeholder="john@yahoo.com" onChange={updateSignUpEmail} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Create a Password</Label>
                                            <Input {...firstPasswordForm} type="password" placeholder="password123" onChange={(e) => {updateAndCheckFirstPassword(e); updateSignUpPassword(e)}}/>
                                            <FormFeedback invalid>Password must be greater than 8 characters :(</FormFeedback>
                                            <FormFeedback valid>Password is valid!</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Confirm Password</Label>
                                            <Input {...comparePasswordForm} type="password" placeholder="retype your password" onChange={updateAndCheckSecondPassword}/>
                                            <FormFeedback invalid>Password does not match ;(</FormFeedback>
                                            <FormFeedback valid>Password matches!</FormFeedback>
                                        </FormGroup>
                                        <Button color="success" onClick={sendSignUpRequest}>Create Your Account</Button>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={formClick}>Sign In</Button>{' '}
                                    <Button color="secondary" onClick={modalClick}>Cancel</Button>
                                </ModalFooter>
                            </>
                        )
                }
            </Modal>
        </div>
    )
}

export default ModalForm