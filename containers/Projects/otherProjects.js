import { Icon, Link, Tooltip } from '@chakra-ui/react'
import { VscGithubAlt } from 'react-icons/vsc'

export default function OtherProjectLink() {
    return <>
        My Projects{'  '}
        <Tooltip label="These are only my featured projects. Please check my other projects on GitHub" placement='right-end' hasArrow>
            <Link isExternal href="https://github.com/aditya-mitra">
                <Icon as={VscGithubAlt} />
            </Link>
        </Tooltip>
        </>
}