import connection from '@/app/mysql';

export default async function createUser(req, res) {
	try {
		let { firstname, lastname, birthday, age } = req.body;
		const [rows] = await connection.query(
			'INSERT INTO employee (firstname, lastname, birthday, age) VALUES (?, ?, ?, ?)',
			[firstname, lastname, birthday, age]
		);
		res.status(201).json(rows);
	} catch (error) {
		return res.status(500).json({ message: 'Something goes wrong' });
	}
}
