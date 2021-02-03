import { render } from '@testing-library/vue'
import Footer from '@/components/Layout/AppFooter.vue'

describe('AppFooter', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(Footer);
        expect(getByTestId('footer')).toBeInTheDocument();
    })

    it('shows the current year as copyright in the footer', () => {
        const { getByText } = render(Footer);
        const currentYear = new Date().getFullYear();
        expect(getByText(2021, { exact: false })).toBeInTheDocument();
    })
})