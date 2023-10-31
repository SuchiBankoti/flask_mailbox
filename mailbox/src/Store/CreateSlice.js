import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    allMail: [],
    isLoading: true,
    trackmail: 0,
    usermail:"",
    activeSentboxId:null,
    activeStarredId:null,
    activeInboxId: null,
    activeDeletedId:null,
    activeSentModal:false
    
}
export const authMailLogin = createAsyncThunk(
    "mailbox/login", (payload) => {
        return fetch("/login", {
          method: "POST",
          body: JSON.stringify({
            user:payload.email,
            password:payload.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {
            if (res.ok) {
                localStorage.setItem('usermail',payload.email)
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
            return fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: payload.email,
                    password:payload.password,
                }),
            }).then(res => {
                if (res.ok) {
                    localStorage.setItem('usermail',payload.email)
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
        return fetch("/allmail").then(data=>data.json()).catch(e=>console.log(e))
    }
)
export const addMail = createAsyncThunk(
    "mailbox/addMail",
    (payload) => {
        return fetch("/add-mail", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
                date:payload.date,
                time:payload.time,
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
        return fetch("/update-mail", {
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
        },
        activateDeletedId: (state, action) => {
          state.activeDeletedId=action.payload  
        },
        getUsermail: (state) => {
            state.usermail=localStorage.getItem('usermail')
        },
        activateModal: (state, action) => {
            state.activeSentModal=action.payload
        }
    },
    extraReducers: {
        [getAllMail.pending]: (state) => {
            state.isLoading=true
        },
        [getAllMail.fulfilled]: (state, action) => {
            state.isLoading = false
            if (action.payload) {
                const a = action.payload;
                const allData=a.allmail
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
            state.trackmail = state.trackmail + 1
            state.activeSentModal=true
        },
        [addMail.rejected]: (state) => {
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
    }

});

export const{activateInboxId,activateSentboxId,activateStarredId, getUsermail,activateModal,activateDeletedId}=mailboxSlice.actions

export default mailboxSlice.reducer







