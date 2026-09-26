const API_URL = "http://localhost:8080";


// ======================================================
// SHOW LOGIN PAGE
// ======================================================

function showLogin() {

    document.getElementById("loginPage").style.display = "block";
    document.getElementById("registerPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "none";

}


// ======================================================
// SHOW REGISTER PAGE
// ======================================================

function showRegister() {

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("registerPage").style.display = "block";
    document.getElementById("dashboardPage").style.display = "none";

}


// ======================================================
// REGISTER
// ======================================================

async function register() {

    const fullName =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;

    const phoneNumber =
        document.getElementById("registerPhone").value;

    const address =
        document.getElementById("registerAddress").value;


    try {

        const response = await fetch(
            `${API_URL}/api/auth/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    FullName: fullName,

                    email: email,

                    password: password,

                    phoneNumber: Number(phoneNumber),

                    address: address

                })
            }
        );


        const result = await response.text();


        document.getElementById("registerMessage").innerText =
            result;


        if (response.ok) {

            alert("Registration successful! Please login.");

            showLogin();

        }

    } catch (error) {

        console.error("Registration error:", error);

        document.getElementById("registerMessage").innerText =
            "Unable to connect to server.";

    }

}


// ======================================================
// LOGIN
// ======================================================

async function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    try {

        const response = await fetch(
            `${API_URL}/api/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,

                    password: password

                })
            }
        );


        const data = await response.json();


        console.log("Login response:", data);


        if (response.ok) {

            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );


            document.getElementById("loginMessage").innerText =
                "Login successful!";


            // Open dashboard
            showDashboard();

        } else {

            document.getElementById("loginMessage").innerText =
                "Login failed. Check your email and password.";

        }

    } catch (error) {

        console.error("Login error:", error);

        document.getElementById("loginMessage").innerText =
            "Unable to connect to server.";

    }

}


// ======================================================
// SHOW DASHBOARD
// ======================================================

function showDashboard() {

    document.getElementById("loginPage").style.display = "none";

    document.getElementById("registerPage").style.display = "none";

    document.getElementById("dashboardPage").style.display = "block";


    // Load account information
    loadAccountDetails();

    loadBalance();

    loadTransactions();

}


// ======================================================
// GET TOKEN
// ======================================================

function getToken() {

    return localStorage.getItem("token");

}


// ======================================================
// LOAD ACCOUNT DETAILS
// ======================================================

async function loadAccountDetails() {

    const token = getToken();


    if (!token) {

        console.error("No JWT token found.");

        showLogin();

        return;

    }


    try {

        const response = await fetch(
            `${API_URL}/api/account/details`,
            {
                method: "GET",

                headers: {

                    "Authorization":
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"

                }
            }
        );


        if (!response.ok) {

            console.error(
                "Account details request failed:",
                response.status
            );

            return;

        }


        const data = await response.json();


        console.log("Account Details:", data);


        // ==========================================
        // REGISTRATION FULL NAME
        // → ACCOUNT HOLDER
        // ==========================================

        document.getElementById("userName").innerText =
            data.fullName || "User";


        

        // ==========================================
        // ACCOUNT NUMBER
        // ==========================================

        document.getElementById("accountNumber").innerText =
            data.accountNumber || "-";


        // ==========================================
        // ACCOUNT TYPE
        // ==========================================

        document.getElementById("accountType").innerText =
            data.accountType || "-";


    } catch (error) {

        console.error(
            "Error loading account details:",
            error
        );

    }

}


// ======================================================
// LOAD BALANCE
// ======================================================

async function loadBalance() {

    const token = getToken();


    if (!token) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/account/balance`,
            {
                method: "GET",

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }
            }
        );


        if (!response.ok) {

            console.error(
                "Balance request failed:",
                response.status
            );

            return;

        }


        const data = await response.json();


        console.log("Balance:", data);


        document.getElementById("balance").innerText =
            "₹" + Number(data).toFixed(2);


    } catch (error) {

        console.error(
            "Error loading balance:",
            error
        );

    }

}


// ======================================================
// DEPOSIT
// ======================================================

async function depositMoney() {

    const amount =
        document.getElementById("depositAmount").value;


    if (!amount || Number(amount) <= 0) {

        document.getElementById("depositMessage").innerText =
            "Please enter a valid amount.";

        return;

    }


    const token = getToken();


    try {

        const response = await fetch(
            `${API_URL}/api/transaction/CREDIT?amount=${amount}`,
            {
                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }
            }
        );


        const result = await response.text();


        document.getElementById("depositMessage").innerText =
            result;


        if (response.ok) {

            document.getElementById("depositAmount").value = "";

            await loadBalance();

            await loadTransactions();

        }

    } catch (error) {

        console.error(
            "Deposit error:",
            error
        );

        document.getElementById("depositMessage").innerText =
            "Transaction failed.";

    }

}


// ======================================================
// WITHDRAW
// ======================================================

async function withdrawMoney() {

    const amount =
        document.getElementById("withdrawAmount").value;


    if (!amount || Number(amount) <= 0) {

        document.getElementById("withdrawMessage").innerText =
            "Please enter a valid amount.";

        return;

    }


    const token = getToken();


    try {

        const response = await fetch(
            `${API_URL}/api/transaction/DEBIT?amount=${amount}`,
            {
                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }
            }
        );


        const result = await response.text();


        document.getElementById("withdrawMessage").innerText =
            result;


        if (response.ok) {

            document.getElementById("withdrawAmount").value = "";

            await loadBalance();

            await loadTransactions();

        }

    } catch (error) {

        console.error(
            "Withdraw error:",
            error
        );

        document.getElementById("withdrawMessage").innerText =
            "Transaction failed.";

    }

}


// ======================================================
// TRANSFER
// ======================================================

async function transferMoney() {

    const receiverAccount =
        document.getElementById("receiverAccount").value;

    const amount =
        document.getElementById("transferAmount").value;


    if (!receiverAccount ||
        !amount ||
        Number(amount) <= 0) {

        document.getElementById("transferMessage").innerText =
            "Please enter valid details.";

        return;

    }


    if (Number(amount) <= 100) {

        document.getElementById("transferMessage").innerText =
            "Transfer amount must be greater than ₹100.";

        return;

    }


    const token = getToken();


    try {

        const response = await fetch(
            `${API_URL}/api/transaction/transfer`,
            {
                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    amount: Number(amount),

                    receiverAccount:
                        Number(receiverAccount)

                })
            }
        );


        const result = await response.text();


        document.getElementById("transferMessage").innerText =
            result;


        if (response.ok) {

            document.getElementById("transferAmount").value = "";

            document.getElementById("receiverAccount").value = "";

            await loadBalance();

            await loadTransactions();

        }

    } catch (error) {

        console.error(
            "Transfer error:",
            error
        );

        document.getElementById("transferMessage").innerText =
            "Transfer failed.";

    }

}


// ======================================================
// LOAD TRANSACTION HISTORY
// ======================================================

async function loadTransactions() {

    const token = getToken();


    if (!token) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/account/transactions`,
            {
                method: "GET",

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }
            }
        );


        if (!response.ok) {

            console.error(
                "Transaction request failed:",
                response.status
            );

            return;

        }


        const transactions =
            await response.json();


        console.log(
            "Transactions:",
            transactions
        );


        const table =
            document.getElementById("transactionTable");


        table.innerHTML = "";


        transactions.forEach(transaction => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${transaction.transaction_id}
                </td>

                <td>
                    ${transaction.type}
                </td>

                <td>
                    ₹${Number(transaction.amount).toFixed(2)}
                </td>

                <td>
                    ${transaction.senderAccount || "-"}
                </td>

                <td>
                    ${transaction.receiverAccount || "-"}
                </td>

                <td>
                    ${formatDate(transaction.time)}
                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error(
            "Error loading transactions:",
            error
        );

    }

}


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(dateString) {

    if (!dateString) {

        return "-";

    }


    const date =
        new Date(dateString);


    return date.toLocaleString();

}


// ======================================================
// SHOW DEPOSIT FORM
// ======================================================

function showDeposit() {

    hideForms();

    document.getElementById("depositForm").style.display =
        "block";

}


// ======================================================
// SHOW WITHDRAW FORM
// ======================================================

function showWithdraw() {

    hideForms();

    document.getElementById("withdrawForm").style.display =
        "block";

}


// ======================================================
// SHOW TRANSFER FORM
// ======================================================

function showTransfer() {

    hideForms();

    document.getElementById("transferForm").style.display =
        "block";

}


// ======================================================
// HIDE ALL FORMS
// ======================================================

function hideForms() {

    document.getElementById("depositForm").style.display =
        "none";

    document.getElementById("withdrawForm").style.display =
        "none";

    document.getElementById("transferForm").style.display =
        "none";

}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    // Remove JWT
    localStorage.removeItem("token");

    // Hide dashboard
    document.getElementById("dashboardPage").style.display =
        "none";

    // Show login
    document.getElementById("loginPage").style.display =
        "block";

}