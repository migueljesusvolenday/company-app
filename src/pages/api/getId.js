import connection from '@/app/mysql';

export default async function getId(req, res) {
	try {
		const { id } = req.body;
		const [rows] = await connection.query('SELECT * FROM employee WHERE id = ?', [id]);

		if (rows.length <= 0) {
			return res.status(404).json({ message: 'Employee not found' });
		}

		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({ message: 'Something goes wrong' });
	}
}
