document.addEventListener('alpine:init', () => {

	Alpine.data('Attendance', () => {

		return {
			firstName:'',
			surname:'',
			email:'',
			username:'',
			password:'',
			confirmPassword:'',
			userType:'',
			emailValid: true,
			lPassword:'',
			lUsername:'',
			validateEmail() {
				const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
				this.emailValid = emailPattern.test(this.email);
            },

			signup(event){
				event.preventDefault();
				if (this.password !== this.confirmPassword || this.userType == '' || !this.emailValid) {
					alert(`Please ensure:(1) Email address has the correct format.
                       (2) User type is selected.
                       (3) Passwords match.`);

                    this.formValid = false;
				} else {
					axios.post('/api/addUser/', {
						firstName : this.firstName,
						surname : this.surname,
						email : this.email,
						username : this.username,
						password : this.password,
						userType : this.userType
					  }).then((result)=>{
						if(result.data.error){
						alert(result.data.error);
						}else{
							alert(result.data.success);
							this.firstName = '';
							this.surname = '';
							this.email = '';
							this.username = '';
							this.password = '';
							this.confirmPassword = '';
							this.userType = '';
							window.location.href = './index.html';
						}
					  })
				}
			},
			init() {
				
			},
			login(){
				
				axios.get(`/api/login/`,{username:this.lUsername,password:this.lPassword})
				.then((result)=>{
					 
					if(result.data.status==="Accessed"){ 

						if(result.data.userType==="admin"){
						   window.location.href='./register.html'
						}
						//navigate to the scan screen if you are not an admit
						else if(result.data.userType==="attendee"){
							window.location.href='./scan.html'
						}
					}
					//else if status is not Accessed you are not registered
					//system will navigate you to sign up
					else{
						alert("you are not registered to the system");
						window.location.href='./signup.html'
					}
					
				})
			},
		}

	});
})