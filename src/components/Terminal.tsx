import './Terminal.css';
import { useState } from 'react';
import graduationData from '@/data/data.json';
import updateCount from '../api/updateCount';
const Terminal = () => {
	const [input, setInput] = useState<string>('');
	const [mode, setMode] = useState<'initial' | 'menu'>('initial');
	const [response, setResponse] = useState<React.ReactNode[]>([]);
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
		if (error) setError('');
	};

	const handleErrorUpdate = (err: Error) => {
		setResponse([
			<p className="terminal-line" key="error">
				❌ {err.message}
			</p>,
		]);
	};

	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			const trimmedInput = input.trim().toLowerCase();

			if (mode === 'initial') {
				if (trimmedInput === 'start') {
					setMode('menu');
					setError('');
					setResponse([]);
				} else if (trimmedInput === '') {
					// Do nothing if input is empty
				} else {
					setError(`Không tìm thấy lệnh: ${trimmedInput}`);
				}
			} else if (mode === 'menu') {
				switch (trimmedInput) {
					case '1':
						const lines = Object.entries(graduationData).map(
							([key, value], index) => {
								const strValue = String(value);
								const displayValue = strValue.startsWith('https') ? (
									<a
										href={strValue}
										target="_blank"
										rel="noopener noreferrer"
										className="a-link"
									>
										{strValue}
									</a>
								) : (
									<span className="json-value">{strValue}</span>
								);
								return (
									<p key={index} className="terminal-line">
										<span className="json-key">{key}</span>:{' '}
										<span className="json-value">{displayValue}</span>
									</p>
								);
							}
						);
						setResponse(lines);
						break;
					case '2':
						setResponse([
							<p className="terminal-line">
								Hãy truy cập{' '}
								<a
									href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=M2dqOHExNWJnc2M1bTRmZHE3dTE2YmhlZzMgZ2h1eTA0N0Bt&tmsrc=ghuy047%40gmail.com"
									target="_blank"
									rel="noopener noreferrer"
									className="a-link"
								>
									đường link
								</a>{' '}
								sau để thêm vào lịch Google của bạn.
							</p>,
						]);
						break;
					case '3':
						setIsLoading(true);
						let currentCount: number | null = null;
						try {
							currentCount = await updateCount();
						} catch (err) {
							setIsLoading(false);
							handleErrorUpdate(err as Error);
							break;
						}
						setIsLoading(false);
						setResponse([
							<p className="terminal-line">
								Cảm ơn bạn đã xác nhận tham gia, sự xuất hiện của bạn rất quan
								trọng với mình! Hẹn gặp bạn vào{' '}
								<span className="json-special-value">
									{graduationData['Ngày']}
								</span>{' '}
								nhé 💕💕💕.
							</p>,
							<p className="terminal-line">
								Thống kê: Hiện tại đã có khoảng{' '}
								<span className="json-special-value">{currentCount || 0}</span>{' '}
								người đã xác nhận tham gia.
							</p>,
						]);
						break;
					case '4':
						setResponse([
							<p className="terminal-line">
								Cảm ơn bạn đã trải nghiệm ứng dụng này!
							</p>,
						]);
						setMode('initial');
						setError('');
						break;
					default:
						setError(`Lệnh không hợp lệ: ${trimmedInput}`);
						break;
				}
			}

			setInput('');
		}
	};

	return (
		<div className="terminal-container-dark">
			<div className="terminal-header">
				<div className="controls">
					<div className="control red"></div>
					<div className="control yellow"></div>
					<div className="control green"></div>
				</div>
			</div>
			<div className="terminal-body">
				<div className="terminal-output">
					{mode === 'initial' ? (
						<p className="terminal-line">
							Chào mừng tới{' '}
							<span style={{ color: '#ffbd2e' }}>Graduation CLI</span> của{' '}
							<span className="name">HuyBNG</span>.
						</p>
					) : (
						<div>
							<p className="terminal-line">Chọn một trong các mục sau:</p>
							<p className="terminal-line">
								<span className="json-key">1. </span>
								Thông tin về lễ tốt nghiệp
							</p>
							<p className="terminal-line">
								<span className="json-key">2. </span>Thêm vào lịch (Google
								Calendar)
							</p>
							<p className="terminal-line">
								<span className="json-key">3. </span>Xác nhận tham gia
							</p>
							<p className="terminal-line">
								<span className="json-key">4. </span>Thoát
							</p>
						</div>
					)}
					{mode === 'menu' && <span>-----</span>}
					{response}
					{error && <p className="terminal-line">❌ {error}</p>}
					{isLoading && (
						<div className="loading-bar">
							<div className="loading-spinner"></div>
							<span>Đang xử lý...</span>
						</div>
					)}
				</div>
				<div className="terminal-input">
					<span className="prompt">&gt;</span>
					<input
						type="text"
						className="input-field"
						placeholder={
							mode === 'initial'
								? 'Gõ Start hoặc start để bắt đầu'
								: 'Nhập lựa chọn (1, 2, 3, 4)'
						}
						value={input}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						autoFocus
					/>
				</div>
			</div>
		</div>
	);
};

export default Terminal;
