import connection from '@/app/mysql';

export default async function deleteUser(req, res) {
	try {
		const { id } = req.body;
		const [rows] = await connection.query('DELETE FROM employee WHERE id = ?', [id]);

		if (rows.affectedRows <= 0) {
			return res.status(404).json({ message: 'Employee not found' });
		}

		res.sendStatus(204).json({ message: 'Employee deleted' });
	} catch (error) {
		return res.status(500).json({ message: 'Something goes wrong' });
	}
}
