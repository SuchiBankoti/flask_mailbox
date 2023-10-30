import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";



const signupApi = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc";
const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVCqLAhTyXyQ5ZA_q0AqV-dtjxAbu5-Zc"
const api = "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/allmail";

const initialState = {
    allMail: [],
    isLoading: true,
    trackmail: 0,
    usermail: null,
    activeSentboxId:null,
    activeStarredId:null,
    activeInboxId:null
    
}
export const authMailLogin = createAsyncThunk(
    "mailbox/login", (payload) => {
        return fetch(loginApi, {
          method: "POST",
          body: JSON.stringify({
            email:payload.email,
            password:payload.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {
            if (res.ok) {
                return res.json();
            }else {
                return Promise.reject("Request failed with status: " + res.status);
              }
        }).catch(e => {
            console.log(e)
            return Promise.reject(e);
        });
    }
)
export const authMailSignUp = createAsyncThunk(
    "mailbox/signUp", (payload) => {
        if (payload.email && payload.password && payload.confirmPassword) {
            return fetch(signupApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: payload.email,
                    password:payload.password,
                    returnSecureToken: true,
                }),
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject("Request failed with status: " + res.status);
                }
            }).catch(e => {
                console.log(e)
                return Promise.reject(e);
            });
        }
    }
)

export const getAllMail = createAsyncThunk(
    "mailbox/getAllMail",
        () => {
        return fetch(`${api}.json`).then(data=>data.json()).catch(e=>console.log(e))
    }
)
export const addMail = createAsyncThunk(
    "mailbox/addMail",
    (payload) => {
        return fetch(`${api}.json`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
                sender: payload.usermail,
                receiver: payload.maildata.emailAddress,
                subject: payload.maildata.subject,
                body: payload.maildata.body,
                read: false,
                deleted: {
                    [payload.usermail]: false,
                    [payload.maildata.emailAddress]:false
                },
                star:{
                    [payload.usermail]: false,
                    [payload.maildata.emailAddress]:false
                }
            })
          }).then((res) => {
              if (res.ok) {
                return res.json();
            }else {
                return Promise.reject("Request failed with status: " + res.status);
              }
          }).catch(e => {
              console.log(e)
              return Promise.reject(e);
          });
    }
)
export const updateMail = createAsyncThunk(
    "mailbox/updateMail",
    (payload) => {
        return fetch(`${api}/${payload.id}.json`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
               ...payload
                
            })
          }).then((res) => {
              if (res.ok) {
                return res.json();
            }else {
                return Promise.reject("Request failed with status: " + res.status);
              }
          }).catch(e => {
              console.log(e)
              return Promise.reject(e);
          });
    }
)

const mailboxSlice = createSlice({
    name: "mailbox",
    initialState,
    reducers: {
        activateSentboxId: (state, action) => {
            state.activeSentboxId=action.payload
        },
        activateInboxId: (state, action) => {
            state.activeInboxId=action.payload
        },
        activateStarredId: (state, action) => {
            state.activeStarredId=action.payload
        }
    },
    extraReducers: {
        [getAllMail.pending]: (state) => {
            state.isLoading=true
        },
        [getAllMail.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload) {
                const allData = Object.entries(action.payload);
                state.allMail = allData
               
            }
        },
        [getAllMail.rejected]: (state) => {
            state.isLoading=false
        },
        [addMail.pending]: (state) => {
            state.isLoading=true
        },
        [addMail.fulfilled]: (state, action) => {
            state.isLoading = false
            state.trackmail=state.trackmail+1
        },
        [addMail.rejected]: (state) => {
            state.isLoading=false
        },
        
        [authMailLogin.pending]: (state) => {
            state.isLoading=true
        },
        [authMailLogin.fulfilled]: (state, action) => {
            state.isLoading = false
            state.usermail = action.payload.email
        },
        [authMailLogin.rejected]: (state) => {
            state.isLoading=false
        },
        [authMailSignUp.pending]: (state) => {
            state.isLoading=true
        },
        [authMailSignUp.fulfilled]: (state, action) => {
            state.isLoading = false
            state.usermail = action.payload.email
        },
        [authMailSignUp.rejected]: (state) => {
            state.isLoading=false
        },
        
        [updateMail.pending]: (state) => {
            state.isLoading=true
        },
        [updateMail.fulfilled]: (state, action) => {
            state.isLoading = false
            state.trackmail=state.trackmail+1
        },
        [updateMail.rejected]: (state) => {
            state.isLoading=false
        },
    }

});

export const{activateInboxId,activateSentboxId,activateStarredId}=mailboxSlice.actions

export default mailboxSlice.reducer







