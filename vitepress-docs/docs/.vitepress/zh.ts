import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
    title: "临时邮箱文档",
    lang: 'zh-Hans',
    description: 'CloudFlare 免费收发 临时域名邮箱',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() },
        },

        editLink: {
            pattern: 'https://github.com/dreamhunter2333/cloudflare_temp_email/edit/main/vitepress-docs/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            message: '基于 MIT 许可发布',
            copyright: `版权所有 © 2023-${new Date().getFullYear()} Dream Hunter`
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: '主页',
            link: '/',
        },
        {
            text: '指南',
            link: '/zh/guide/quick-start',
            activeMatch: '/zh/guide/'
        },
        {
            text: '服务状态',
            link: '/status',
        },
        {
            text: '参考',
            link: '/reference',
        },
        {
            text: process.env.TAG_NAME || 'v0.2.2',
            items: [
                {
                    text: '更新日志',
                    link: 'https://github.com/dreamhunter2333/cloudflare_temp_email/blob/main/CHANGELOG.md'
                },
                {
                    text: '参与贡献',
                    link: 'https://github.com/dreamhunter2333/cloudflare_temp_email'
                }
            ]
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '简介',
            collapsed: false,
            items: [
                { text: '什么是临时邮箱', link: 'what-is-temp-mail' },
                { text: 'Star History', link: 'star-history' },
                { text: '快速开始部署', link: 'quick-start' },
            ]
        },
        {
            text: '通过命令行部署',
            collapsed: false,
            items: [
                { text: '命令行部署准备', link: 'cli/pre-requisite' },
                { text: 'D1 数据库', link: 'cli/d1' },
                { text: '配置 DKIM', link: 'dkim' },
                { text: 'Cloudflare workers 后端', link: 'cli/worker' },
                { text: '配置邮件转发', link: 'email-routing.md' },
                { text: 'Cloudflare Pages 前端', link: 'cli/pages' },
                { text: '配置发送邮件', link: 'config-send-mail' },
            ]
        },
        {
            text: '通过用户界面部署',
            collapsed: false,
            items: [
                { text: 'D1 数据库', link: 'ui/d1' },
                { text: '配置 DKIM', link: 'dkim' },
                { text: 'Cloudflare workers 后端', link: 'ui/worker' },
                { text: '配置邮件转发', link: 'email-routing.md' },
                { text: 'Cloudflare Pages 前端', link: 'ui/pages' },
                { text: '配置发送邮件', link: 'config-send-mail' },
            ]
        },
        {
            text: '功能简介',
            collapsed: false,
            items: [
                { text: 'Admin 控制台', link: 'feature/admin' },
            ]
        },
        { text: '参考', base: "/", link: 'reference' }
    ]
}
