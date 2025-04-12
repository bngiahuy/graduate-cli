import { supabase } from '../supabase/client';

const RATE_LIMIT_SECONDS = import.meta.env.VITE_RATE_LIMIT_SECONDS || 60; // seconds
const LAST_UPDATE_KEY = 'lastCountUpdate';

const updateCount = async () => {
	// Lấy thời điểm cập nhật cuối cùng đã được lưu
	const { data, error } = await supabase
		.from('interaction_count')
		.select('count')
		.eq('id', 1)
		.single();

	const lastUpdateStr = localStorage.getItem(LAST_UPDATE_KEY);
	const now = Date.now();

	localStorage.setItem(LAST_UPDATE_KEY, now.toString());

	if (error) {
		console.error('Error updating count:', error);
		return null;
	} else {
		if (lastUpdateStr) {
			const lastUpdate = parseInt(lastUpdateStr, 10);
			if (now - lastUpdate < RATE_LIMIT_SECONDS * 1000) {
				console.warn(
					'Rate limit applied. Please wait 1 minute before trying again.'
				);
				throw new Error('API vượt quá giới hạn. Vui lòng thử lại sau 1 phút.');
			}
		}
	}

	const newCount = data?.count + 1;
	const { error: updateError } = await supabase
		.from('interaction_count')
		.update({ count: newCount })
		.eq('id', 1);

	if (updateError) {
		console.error('Error updating count:', updateError);
		return null;
	}

	console.log('Count updated successfully:', newCount);
	return newCount;
};

export default updateCount;
