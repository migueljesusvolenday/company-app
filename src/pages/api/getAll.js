import connection from '@/app/mysql';

export default async function getAll(req, res) {
	try {
		const [rows] = await connection.query('SELECT * FROM employee');
		res.json(rows);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something goes wrong' });
	}
}
