from argparse import ArgumentParser

from media_wizard import create_app


app = create_app()

def buildArgumentParser():
    parser = ArgumentParser(description='Media Wizard')
    parser.add_argument('-p', '--port',
        help='Specify a port')
    parser.add_argument('-i', '--interactive', store=True,
        help='Run in interactive mode')
    return parser

def main():
    args = buildArgumentParser().parse_args()
    app.run(port=args.port or app.config.get('APP_PORT'))

if __name__ == '__main__':
    main()
