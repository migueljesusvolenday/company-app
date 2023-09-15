'use client';

import React from 'react';
import { useState, useRef } from 'react';
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

	function dateFormat(dateToformat) {
		let index = dateToformat.indexOf('T');
		let date = dateToformat.substring(0, index);
		return date;
	}

	const hundleList = async e => {
		e.preventDefault();

		list.current.innerHTML = '';
		const data = await fetch('/api/getAll', {
			method: 'post'
		});
		const users = await data.json();
		console.log(users);
		users.forEach(item => {
			item.birthday = dateFormat(item.birthday);

			list.current.innerHTML += `<li><span>ID: ${item.id}</span><span> Firstname: ${item.firstname}</span><span>  Lastname: ${item.lastname}</span><span> Birthday: ${item.birthday}</span><span>  Age: ${item.age}</span></li>`;
		});
	};

	const hundleCreate = async evt => {
		evt.preventDefault();

		let edad = getAge(birthday);

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

	const hundleGetId = async evt => {
		evt.preventDefault();
		console.log(id);
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
	};

	const hundleUpdate = async evt => {
		evt.preventDefault();
		let edad = getAge(updatebirthday);

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
	};

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
		} catch (error) {
			console.log(error);
		}
		list.current.innerHTML = '';
		setDeleteId(0);
	};

	return (
		<div>
			{/* Form create */}
			<div className="form">
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

					<button className="create" onClick={hundleCreate}>
						Create Employee
					</button>
				</form>
			</div>
			{/* Form update */}
			<div className="form">
				<form>
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
					<button className="create" onClick={hundleUpdate}>
						Update Employee
					</button>
				</form>
			</div>
			{/* Form get */}
			<div className="form">
				<label className="label">
					Enter Id:
					<input type="number" value={id} onChange={e => setId(e.target.value)} />
				</label>
				<button className="id" onClick={hundleGetId}>
					Show Employee Data
				</button>
				<p ref={showdata} className="showdata"></p>
			</div>

			{/* Form delete */}
			<div className="form">
				<label className="label">
					Enter Id:
					<input type="number" value={deleteId} onChange={e => setDeleteId(e.target.value)} />
				</label>
				<button className="id" onClick={handleDelete}>
					Delete
				</button>
			</div>

			<div className="lista">
				{' '}
				{/* List */}
				<h1>Employees</h1>
				<button className="id" onClick={hundleList}>
					List
				</button>
				<ul ref={list}></ul>
			</div>
		</div>
	);
}
