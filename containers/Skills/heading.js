import { Icon } from '@chakra-ui/react';
import { BsGearFill } from 'react-icons/bs';

export default function HeadingWithIcon() {
	return (
		<>
			My Tech Skills{'  '}
			<Icon as={BsGearFill} />
		</>
	);
}
