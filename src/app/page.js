'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { userSchema, userSchemaUpdate } from '@/app/validations/UserValidation';
import * as yup from 'yup';
import './styles/page.css';

export default function Home() {
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const [birthday, setBirthday] = useState('');

	const [updatefirstname, setupdateFirstName] = useState('');
	const [updatelastname, setupdateLastName] = useState('');
	const [updatebirthday, setupdateBirthday] = useState('');
	const [id, setId] = useState(0);

	const [deleteId, setDeleteId] = useState(0);
	const [updateId, setUpdateId] = useState(0);

	const list = useRef(null);
	const showdata = useRef(null);
	const lista = useRef();
	const createForm = useRef();
	const updateForm = useRef();
	const showDataForm = useRef();
	const deleteForm = useRef();


	function dateFormat(dateToformat) {
		let index = dateToformat.indexOf('T');
		let date = dateToformat.substring(0, index);
		return date;
	}

	useEffect(() => {

		handleList();
		
	}, [firstname, deleteId, updatefirstname, updatelastname
		, updatebirthday,]);
	
	const handleEdit = (evt) => {
		evt.preventDefault();
		let idToUpdate = evt.target.parentNode.firstChild.textContent;
		idToUpdate = idToUpdate.substring(4, idToUpdate.length);
		setUpdateId(idToUpdate);
		showHideToggle();
	}

	async function handleList() {
		
		try {
			list.current.innerHTML = '';
			const data = await fetch('/api/getAll', {
				method: 'post'
			});
			const users = await data.json();
			console.log(users);
			users.forEach(item => {
				item.birthday = dateFormat(item.birthday);
	
				let li = document.createElement("li"); // Crear el elemento li
				let spanId = document.createElement("span"); // Crear el elemento span para el id
				spanId.textContent = `ID: ${item.id}`; // Asignar el texto al span
				li.appendChild(spanId); // Agregar el span al li
				let spanFirstname = document.createElement("span"); // Crear el elemento span para el firstname
				spanFirstname.textContent = `Firstname: ${item.firstname}`; // Asignar el texto al span
				li.appendChild(spanFirstname); // Agregar el span al li
				let spanLastname = document.createElement("span"); // Crear el elemento span para el firstname
				spanLastname.textContent = `Lastname: ${item.lastname}`; // Asignar el texto al span
				li.appendChild(spanLastname); // Agregar el span al li
				let spanBirthday = document.createElement("span"); // Crear el elemento span para el firstname
				spanBirthday.textContent = `Birthday: ${item.birthday}`; // Asignar el texto al span
				li.appendChild(spanBirthday); // Agregar el span al li
				let spanAge = document.createElement("span"); // Crear el elemento span para el firstname
				spanAge.textContent = `Birthday: ${item.age}`; // Asignar el texto al span
				li.appendChild(spanAge); // Agregar el span al li
				let button = document.createElement("button"); // Crear el elemento button
				button.textContent = "Edit"; // Asignar el texto al button
				button.addEventListener("click", handleEdit); // Asignar el evento onClick al button
				li.appendChild(button); // Agregar el button al li
				list.current.appendChild(li); // Agregar el li al elemento list
							
				
	
			});
	
		} catch (error) {
			console.log(error);
		}
	};


	const handleCreate = async evt => {
		evt.preventDefault();
		try {
			let user = {
				firstname: firstname,
				lastname: lastname,
				birthday: birthday,
			}
			let edad = getAge(birthday);
			await userSchema.validate(user, { abortEarly: false });

			const response = await fetch('/api/createUser', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstname: firstname,
					lastname: lastname,
					birthday: birthday,
					age: edad
				})
			});
			const data = await response.json();
			console.log(data);
			setFirstName('');
			setLastName('');
			setBirthday('');
	
	
		} catch (error) {
			console.log(error);
			for (let i = 0; i < error.errors.length; i++) {
				alert(error.errors[i]);
				
			}
		}

	};

	function getAge(fecha) {
		let today = new Date();
		let date = fecha;
		let edad = 0;
		let arrayDate = date.split('-');

		let year = parseInt(arrayDate[0]);
		let month = parseInt(arrayDate[1]);
		let day = parseInt(arrayDate[2]);

		edad = today.getFullYear() - year - 1;

		if (today.getMonth() + 1 - month < 0) {
			return edad;
		}

		if (today.getMonth() + 1 - month > 0) {
			return edad + 1;
		}

		if (today.getUTCDate() - day >= 0) {
			return edad + 1;
		}

		return edad;
	}

	const handleGetId = async evt => {
		evt.preventDefault();
		console.log(id);
		try {
			const response = await fetch('/api/getId', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: id
				})
			});
			const data = await response.json();
			console.log(data);
			if (data.firstname === undefined) {
				showdata.current.innerHTML = `<span> Employee not found</span>`;
			} else {
				data.birthday = dateFormat(data.birthday);
	
				showdata.current.innerHTML = `<span> Firstname: ${data.firstname}</span><span>  Lastname: ${data.lastname}</span><span> Birthday: ${data.birthday}</span><span>  Age: ${data.age}</span>`;
			}
			setId(0);
	
		} catch (error) {
			console.log(error);	
		}
	};

	const handleUpdate = async evt => {
		evt.preventDefault();
		try {
			let user = {
				updatefirstname: updatefirstname,
				updatelastname: updatelastname,
			}
			let edad = getAge(updatebirthday);
			await userSchemaUpdate.validate(user, { abortEarly: false });


			const response = await fetch('/api/updateUser', {
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
	
				body: JSON.stringify({
					id: updateId,
					firstname: updatefirstname,
					lastname: updatelastname,
					birthday: updatebirthday,
					age: edad
				})
			});
	
			setUpdateId('');
			setupdateFirstName('');
			setupdateLastName('');
			setupdateBirthday('');
	
			list.current.innerHTML = '';
			const data = await response.json();
			console.log(data);
	
			showHideToggle();
	
		} catch (error) {
			console.log(error);
			for (let i = 0; i < error.errors.length; i++) {
				alert(error.errors[i]);
				
			}

		}
	};
	
	function showHideToggle() {
		createForm.current.classList.toggle('hide');
		updateForm.current.classList.toggle('hide');
		showDataForm.current.classList.toggle('hide');
		deleteForm.current.classList.toggle('hide');
		lista.current.classList.toggle('hide');
	
	}

	const handleDelete = async evt => {
		evt.preventDefault();
		console.log(deleteId);
		try {
			const response = await fetch('/api/deleteUser', {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: deleteId
				})
			});
			list.current.innerHTML = '';
			setDeleteId(0);
	
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{/* Form create */}
			<div className="form" ref={createForm}>
				<h2>Create Employee</h2>
				<form>
					<label className="label">
						Enter Firstname:
						<input type="text" value={firstname} onChange={e => setFirstName(e.target.value)} />
					</label>
					<label className="label">
						Enter Lastname:
						<input type="text" value={lastname} onChange={e => setLastName(e.target.value)} />
					</label>
					<label className="label">
						Enter Birthday:
						<input
							type="date"
							value={birthday}
							placeholder="YYYY-MM-DD"
							onChange={e => setBirthday(e.target.value)}
						/>
					</label>

					<button className="create" onClick={handleCreate}>
						Create Employee
					</button>
				</form>
			</div>
			{/* Form update */}
			<div className="form, hide" ref={updateForm}>
				<h2>Update Employee</h2>
				<form>
					<button className='id'>Back</button>
					<label className="label">
						Enter ID:
						<input type="text" value={updateId} onChange={e => setUpdateId(e.target.value)} />
					</label>
					<label className="label">
						Enter Firstname:
						<input type="text" value={updatefirstname} onChange={e => setupdateFirstName(e.target.value)} />
					</label>
					<label className="label">
						Enter Lastname:
						<input type="text" value={updatelastname} onChange={e => setupdateLastName(e.target.value)} />
					</label>
					<label className="label">
						Enter Birthday:
						<input
							type="date"
							value={updatebirthday}
							placeholder="YYYY-MM-DD"
							onChange={e => setupdateBirthday(e.target.value)}
						/>
					</label>
					<button className="create" onClick={handleUpdate}>
						Update Employee
					</button>
				</form>
			</div>
			{/* Form get */}
			<div className="form" ref={showDataForm}>
				<h2>Show Employee Data</h2>
				<label className="label">
					Enter Id:
					<input type="number" value={id} onChange={e => setId(e.target.value)} />
				</label>
				<button className="id" onClick={handleGetId}>
					Show Employee Data
				</button>
				<p ref={showdata} className="showdata"></p>
			</div>

			{/* Form delete */}
			<div className="form" ref={deleteForm}>
			<h2>Delete Employee Data</h2>
				<label className="label">
					Enter Id:
					<input type="number" value={deleteId} onChange={e => setDeleteId(e.target.value)} />
				</label>
				<button className="id" onClick={handleDelete}>
					Delete
				</button>
			</div>

			<div className="lista" ref={lista}>
				{' '}
				{/* List */}
				<h1>Employees</h1>
				<ul ref={list}></ul>
			</div>
		</div>
	);
}
