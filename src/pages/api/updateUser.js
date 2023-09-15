import connection from '@/app/mysql';

export default async function updateUser(req, res) {
	try {
		const { id } = req.body;
		const { firstname, lastname, birthday, age } = req.body;

		const [result] = await connection.query(
			'UPDATE employee SET firstname = IFNULL(?, firstname), lastname = IFNULL(?, lastname), birthday = IFNULL(?, birthday), age = IFNULL(?, age) WHERE id = ?',
			[firstname, lastname, birthday, age, id]
		);

		if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });

		res.status(200).json({ message: 'Employee updated' });
	} catch (error) {
		return res.status(500).json({ message: 'Something goes wrong' });
	}
}
