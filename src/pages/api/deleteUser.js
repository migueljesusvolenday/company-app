import connection from '@/app/mysql';

export default async function deleteUser(req, res) {
	try {
		const { id } = req.body;
		const user = await connection.query('DELETE FROM employee WHERE id = ?', [id]);

		if (user.affectedRows <= 0) {
			return res.status(404).json({ message: 'Employee not found' });
		}

		res.sendStatus(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: 'Something goes wrong' });
	}
}
