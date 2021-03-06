import { Neovim } from '@chemzqm/neovim'
import { BasicList, ListContext, ListItem, ListArgument } from '../..'
import manager from '../../list/manager'
import helper from '../helper'
import { CancellationToken } from 'vscode-jsonrpc'

class OptionList extends BasicList {
  public name = 'option'
  public options: ListArgument[] = [{
    name: '-w, -word',
    description: 'word'
  }, {
    name: '-i, -input INPUT',
    hasValue: true,
    description: 'input'
  }]
  public loadItems(_context: ListContext, _token: CancellationToken): Promise<ListItem[]> {
    return Promise.resolve([])
  }
}

let nvim: Neovim
beforeAll(async () => {
  await helper.setup()
  nvim = helper.nvim
})

afterAll(async () => {
  await helper.shutdown()
})

afterEach(async () => {
  await manager.cancel()
  await helper.reset()
})

describe('BasicList', () => {
  describe('parse arguments', () => {
    it('should parse args #1', () => {
      let list = new OptionList(nvim)
      let res = list.parseArguments(['-w'])
      expect(res).toEqual({ word: true })
    })

    it('should parse args #2', () => {
      let list = new OptionList(nvim)
      let res = list.parseArguments(['-word'])
      expect(res).toEqual({ word: true })
    })

    it('should parse args #3', () => {
      let list = new OptionList(nvim)
      let res = list.parseArguments(['-input', 'foo'])
      expect(res).toEqual({ input: 'foo' })
    })
  })
})

describe('list sources', () => {

  describe('commands', () => {
    it('should load commands source', async () => {
      await manager.start(['commands'])
      expect(manager.isActivated).toBe(true)
    })

    it('should do run action', async () => {
      await manager.start(['commands'])
      await helper.wait(100)
      await manager.doAction()
    })
  })

  describe('diagnostics', () => {
    it('should load diagnostics source', async () => {
      await manager.start(['diagnostics'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('extensions', () => {
    it('should load extensions source', async () => {
      await manager.start(['extensions'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('folders', () => {
    it('should load folders source', async () => {
      await manager.start(['folders'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })

    it('should run delete action', async () => {
      await manager.start(['folders'])
      await manager.ui.ready
      await helper.wait(100)
      await manager.doAction('delete')
    })
  })

  describe('links', () => {
    it('should load links source', async () => {
      await manager.start(['links'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('lists', () => {
    it('should load lists source', async () => {
      await manager.start(['lists'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('outline', () => {
    it('should load outline source', async () => {
      await manager.start(['outline'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('output', () => {
    it('should load output source', async () => {
      await manager.start(['output'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('services', () => {
    it('should load services source', async () => {
      await manager.start(['services'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('sources', () => {
    it('should load sources source', async () => {
      await manager.start(['sources'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })

  describe('symbols', () => {
    it('should load symbols source', async () => {
      await manager.start(['symbols'])
      await manager.ui.ready
      await helper.wait(100)
      expect(manager.isActivated).toBe(true)
    })
  })
})
