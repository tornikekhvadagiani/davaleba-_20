function header() {
	// const header = document;
}

header();

// functions for sending data to server
function formActions() {
	const openRegFormBtn = document.querySelector("#open-reg-form");

	function showSelectedModal(selector) {
		const modal = document.querySelector(selector);
		const closeModalBtn = modal.querySelector(".modal-close");
		// console.log(closeModalBtn, modal);
		modal.classList.add("open");
		closeModalBtn.addEventListener("click", () => {
			modal.classList.remove("open");
		});
	}

	openRegFormBtn.addEventListener("click", () => {
		showSelectedModal("#reg-modal");
	});



	const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
		getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
		getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", //id, method  GET
		updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", //id, method PUT
		deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; //id, method DELETE

	const regForm = document.querySelector("#reg"),
		userName = document.querySelector("#user_name"),
		userSurname = document.querySelector("#user_surname"),
		userEmail = document.querySelector("#user_email"),
		userPhone = document.querySelector("#user_phone"),
		userPersonalID = document.querySelector("#user_personal-id"),
		userZip = document.querySelector("#user_zip-code"),
		userGender = document.querySelector("#user_gender"),
		// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
		user_id = document.querySelector("#user_id");

	const userreg = {
		first_name: userName,
		last_name: userSurname,
		phone: userPhone,
		id_number: userPersonalID,
		email: userEmail,
		gender: userGender,
		zip_code: userZip,
	};




	// TODO: დაასრულეთ შემდეგი ფუნქციები






	function renderUsers(user) {

		const mytable = document.getElementById("data_table");

		user.forEach(user => {
			let newRow = document.createElement("tr");
			Object.values(user).forEach((value) => {
				let cell = document.createElement("td");
				cell.innerText = value;
				newRow.appendChild(cell);

			})

			


			createEditButton(newRow, user);
			createDeleteButton(newRow, user);
			mytable.appendChild(newRow);
		});
		userActions();
	}

	// TODO: დაასრულე
	function userActions() {
		// 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
		// 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
		// 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით მაგ:selectedElement.dataset
		// 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUser ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
		// 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი. ედიტის ღილაკზე უნდა გამოიძახოთ getUser ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)  ეს დატა უნდა შეივსოს ფორმში და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია და ფორმის დასაბმითებისას უნდა მოხდეს updateUser() ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც  მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლიათ შეინახოთ
	}

	function getAllUsers() {
		fetch("https://borjomi.loremipsum.ge/api/all-users")
			.then((response) => {
				// console.log(response);
				return response.json();
			})
			.then((data) => {
				console.log(data);
				const users = data.users;
				// console.log(users);

				// html-ში გამოტანა მონაცემების
				renderUsers(users);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getUser(id) {
		fetch(`http://borjomi.loremipsum.ge/api/get-user/${id}`)
			.then((res) => res.json())
			.then((data) => {
				// გვიბრუნებს იუზერის ობიექტს
				const user = data.users;
				// console.log(user);
				return user.value;
				//TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function deleteUser(id) {
		fetch(`http://borjomi.loremipsum.ge/api/delete-user/${id}`, {
			method: "delete",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// გვიბრუნებს სტატუსს
				getAllUsers(); // შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან უნდა წამოვიღოთ დატა
				// ამიტომ აქ ყველგან დაგვჭირდება უბრალოდ ამ ფუნქციის გამოძახება, რომელიც ხელახლა გადახატავს ინფორმაციას
			})
			.catch((error) => {
				console.log(error);
			});
	}



	function updateUser(userObj) {

		fetch(`http://borjomi.loremipsum.ge/api/update-user/${userObj.id}`, {
			method: "put",
		})
			.then((res) => res.json())
			.then((data) => {
				// გვიბრუნებს იუზერის ობიექტს
				console.log(data);
				return data;
				//TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
			})
			.catch((error) => {
				console.log(error);
			});

	}

	function addNewUser(info) {
		fetch("https://borjomi.loremipsum.ge/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(info),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// გვიბრუნებს სტატუსს (წარმატებით გაიგზავნა თუ არა) და დამატებული იუზერის ობიექტს
				// დატის მიღების შემდეგ ვწერთ ჩვენს კოდს
				console.log(data);
				// შენახვის, ედიტირების და წაშლის შემდეგ ხელახლა გამოგვაქვს ყველა იუზერი
				getAllUsers();
			})
			.catch((err) => {
				console.log(err);
			});
	}
	// იგივე ფუნქცია async await ის გამოყენებით

	// async function addNewUserAsync(info) {
	// 	try {
	// 		const response = await fetch(
	// 			"https://borjomi.loremipsum.ge/api/register",
	// 			{
	// 				method: "POST",
	// 				headers: { "Content-Type": "application/json" },
	// 				body: JSON.stringify(info),
	// 			}
	// 		);

	// 		const data = await response.json();
	// 		console.log(data);
	// 		getAllUsers();
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		console.log("finally");
	// 	}
	// }

	getAllUsers();

	regForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const userNameValue = userName.value;
		const userEmailValue = userEmail.value;
		const userSurnameValue = userSurname.value;
		const userPersonalIDValue = userPersonalID.value;
		const userPhoneValue = userPhone.value;
		const userGenderValue = userGender.value;
		const userZipValue = userZip.value;

		// console.log(
		// 	userNameValue,
		// 	userEmailValue,
		// 	userSurnameValue,
		// 	userPersonalIDValue,
		// 	userPhoneValue,
		// 	userGenderValue,
		// 	userZipValue
		// );

		const user = {
			id: user_id.value, //ეს #user_id hidden input გვაქვს html-ში და ამას გამოვიყენებთ მხოლოდ დაედითებისთვის
			first_name: userNameValue,
			last_name: userSurnameValue,
			phone: userPhoneValue,
			id_number: userPersonalIDValue,
			email: userEmailValue,
			gender: userGenderValue,
			zip_code: userZipValue,
		};

		addNewUser(user);

		//  TODO: თუ user_id.value არის ცარიელი (თავიდან ცარიელია) მაშინ უნდა შევქმნათ  -->  addNewUser(user);
		// თუ დაედითებას ვაკეთებთ, ჩვენ ვანიჭებთ მნიშვნელობას userActions ფუნქციაში
		// TODO: თუ user_id.value არის (არაა ცარიელი სტრინგი) მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფუთით ვავსებთ, ვაედითებთ და ვასაბმითებთ) -->  updateUser(user);

		// console.log(user, JSON.stringify(user));
	});

	function createEditButton(newRow, user) {
		let edit = document.createElement("td");
		newRow.appendChild(edit);
		var userid = user["id"];
		const deleteExpense = "<button class='editbutton' id = '" + userid + "'>Edit</button>";
		edit.innerHTML = deleteExpense;
		edit.addEventListener("click", () => {
			showSelectedModal("#edit-modal");

			var gerUserById = getUser(userid);
			// console.log("function");
			// console.log(gerUserById);

			// 		const userNameValue = gerUserById.first_name;
			// 		const userEmailValue =  gerUserById.email;
			// 		const userSurnameValue =  gerUserById.last_name;
			// 		const userPersonalIDValue =  gerUserById.id_number;
			// 		const userPhoneValue =  gerUserById.phone;
			// 		const userGenderValue = gerUserById.gender;
			// 		const userZipValue =  gerUserById.zip_code;
			// 		console.log(userNameValue);


			// 		userName = document.querySelector("#user_name"),
			// 		userSurname = document.querySelector("#user_surname"),
			// 		userEmail = document.querySelector("#user_email"),
			// 		userPhone = document.querySelector("#user_phone"),
			// 		userPersonalID = document.querySelector("#user_personal-id"),
			// 		userZip = document.querySelector("#user_zip-code"),
			// 		userGender = document.querySelector("#user_gender"),
			// 		// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
			// 		user_id = document.querySelector("#user_id");

			// 		userName.innerHTML=userNameValue;


		});
	}



	function createDeleteButton(newRow, user) {
		let deleteUserCell = document.createElement("td");
		newRow.appendChild(deleteUserCell);
		const deleteExpense = "<button class='deleteButton' id = '" + user["id"] + "'>Delete</button>";
		deleteUserCell.innerHTML = deleteExpense;
		deleteUserCell.addEventListener("click", () => {
			deleteUser(user["id"]);
		});


	}
}

formActions();
